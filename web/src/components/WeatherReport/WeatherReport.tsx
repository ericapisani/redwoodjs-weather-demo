import { parseISO, formatISO9075 } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'

const WeatherReport = ({ weatherReport }) => {
  return (
    <div className="border border-gray-200 rounded-md p-6 shadow-sm space-y-4">
      <div className="bg-gray-200 p-4 rounded-md">
        <p className="text-xl font-bold">{weatherReport.worldCity?.city}</p>
        <p>{weatherReport.worldCity?.adminName}</p>
        <p>
          <Link
            to={routes.worldCities({
              country: weatherReport.worldCity?.country,
            })}
          >
            {weatherReport.worldCity?.country}
          </Link>
        </p>
      </div>
      <div className="bg-gray-300 p-4 rounded-md">
        <p>
          <img
            className="block"
            src={`http://openweathermap.org/img/wn/${weatherReport.icon}@2x.png`}
            alt={weatherReport.icon}
          ></img>
        </p>
        <p>{weatherReport.headline}</p>
        <p>{weatherReport.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-400 mt-4 rounded-md">
        <p className="text-md">Temp: {weatherReport.tempFahrenheit}&deg;F</p>
        <p className="text-md">
          Temp: {weatherReport.tempCelcius}
          &deg;C
        </p>
        <p className="text-md">
          Temp min: {weatherReport.tempMinFahrenheit}&deg;F
        </p>
        <p className="text-md">
          Temp min: {weatherReport.tempMinCelcius}&deg;C
        </p>
        <p className="text-md">
          Temp max: {weatherReport.tempMaxFahrenheit}&deg;F{' '}
        </p>
        <p className="text-md">
          Temp max: {weatherReport.tempMaxCelcius}&deg;C
        </p>

        <p className="text-md">
          Feels Like: {weatherReport.feelsLikeFahrenheit}&deg;F
        </p>
        <p className="text-md">
          Feels Like: {weatherReport.feelsLikeCelcius}&deg;C
        </p>

        <p className="text-md">Pressure: {weatherReport.pressure}</p>
        <p className="text-md">Humidity: {weatherReport.humidity}</p>
        <p className="text-md">Wind: {weatherReport.windSpeed} m/sec</p>
        <p className="text-md">
          Wind Direction: {weatherReport.windDegrees}&deg;
        </p>
        <p className="text-md">
          Sunrise: {formatISO9075(parseISO(weatherReport.sunrise))}
        </p>
        <p className="text-md">
          Sunset: {formatISO9075(parseISO(weatherReport.sunset))}
        </p>
      </div>
    </div>
  )
}

export default WeatherReport
