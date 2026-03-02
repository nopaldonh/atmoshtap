import type { Forecast } from '@/types';
import Image from 'next/image';
import { TbDropletsFilled } from 'react-icons/tb';
import { LuWind } from 'react-icons/lu';
import { CiCircleInfo } from 'react-icons/ci';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import {
  getCurrentWeatherByCityId,
  getWeatherForecastByCityId,
} from '@/lib/openweathermap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import HourlyForecastCard from '@/components/HourlyForecastCard';

export default async function WeatherDetailsPage({
  params,
}: {
  params: Promise<{
    cityId: number;
  }>;
}) {
  const { cityId } = await params;
  let error = '';

  const currentWeather = await getCurrentWeatherByCityId(cityId).catch(
    (err) => {
      error = err;
      return null;
    },
  );

  const weatherForecast = await getWeatherForecastByCityId(cityId).catch(
    (err) => {
      error = err;
      return null;
    },
  );

  interface GroupedByDate {
    [date: string]: Forecast[];
  }

  const groupedByDate = weatherForecast?.list.reduce(
    (acc: GroupedByDate, item) => {
      const date = format(parseISO(item.dt_txt), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {},
  );

  const dateList = Object.keys(groupedByDate || []);

  return (
    <>
      {error && (
        <div className="text-red-500 text-center mt-4">
          Error fetching weather data: {error}
        </div>
      )}

      {currentWeather && (
        <div className="font-sofia-sans mx-auto">
          <Image
            className="mx-auto mb-6"
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
            alt={currentWeather.weather[0].description}
            width={200}
            height={200}
            priority
          />
          <div className="drop-shadow font-sofia-sans font-bold text-center text-white">
            <div className="text-[4rem]">
              {weatherForecast?.city.name} -{' '}
              {format(
                toZonedTime(
                  new Date(
                    Date.now() + currentWeather.timezone * 1000,
                  ).toISOString(),
                  'UTC',
                ),
                'd MMMM, HH:mm',
              )}
            </div>
            <div className="text-[4rem]">
              {Math.round(currentWeather.main.temp)}°C
            </div>
            <div className="text-5xl capitalize">
              {currentWeather.weather[0].description}
            </div>
            <div className="flex justify-center gap-6 mt-3 text-2xl">
              <div className="flex gap-2 items-center">
                <LuWind />
                <span>{currentWeather.wind.speed}m/s</span>
                <CiCircleInfo className="size-[18px]" />
              </div>
              <div className="flex gap-2 items-center">
                <TbDropletsFilled />
                <span>{currentWeather.main.humidity}%</span>
                <CiCircleInfo className="size-[18px]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5 day forecast */}
      {weatherForecast && (
        <div>
          <Tabs defaultValue={dateList[0]} className="w-full mt-16">
            <div className="overflow-x-auto">
              <TabsList className="">
                {dateList.map((item) => (
                  <TabsTrigger key={item} value={item}>
                    {format(parseISO(item), 'd MMM')}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {dateList.map((item) => (
              <TabsContent key={item} value={item} className="mt-6">
                <Carousel>
                  <CarouselContent className="-ml-6">
                    {groupedByDate &&
                      groupedByDate[item].map((forecast) => (
                        <CarouselItem
                          key={forecast.dt_txt}
                          className="md:basis-1/4 lg:basis-1/6 pl-6 basis-1/2"
                        >
                          <HourlyForecastCard
                            forecast={forecast}
                            city={weatherForecast?.city}
                          />
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <div className="absolute top-1/2 left-2 flex items-center justify-center">
                    <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
                  </div>
                  <div className="absolute top-1/2 right-2 flex items-center justify-center">
                    <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
                  </div>
                </Carousel>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </>
  );
}
