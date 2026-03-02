import { Forecast, ForecastCity } from '@/types';
import Image from 'next/image';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export default function HourlyForecastCard({
  city,
  forecast,
}: {
  city: ForecastCity;
  forecast: Forecast;
}) {
  return (
    <div
      className={` border py-3 px-8 h-full rounded-xl drop-shadow text-center  ${
        forecast.sys.pod == 'd'
          ? 'border-white text-white bg-[linear-gradient(193.25deg,rgba(255,255,255,0.12)4.58%,rgba(255,255,255,0.24)95.62%)]'
          : 'border-slate-500 bg-gray text-gray-200 bg-[linear-gradient(to_top,#191970ee,#1f2937ee)]'
      }`}
    >
      <div className="text-xl">
        {format(
          toZonedTime(
            new Date((forecast.dt + city.timezone) * 1000).toISOString(),
            'UTC',
          ),
          'HH:mm',
        )}
      </div>
      <Image
        className="mx-auto mb-6"
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        alt={forecast.weather[0].description}
        width={80}
        height={80}
        priority
      />
      <div className="text-2xl font-bold">{forecast.main.temp}°C</div>
      <div className="text-lg font-semibold capitalize">
        {forecast.weather[0].description}
      </div>
    </div>
  );
}
