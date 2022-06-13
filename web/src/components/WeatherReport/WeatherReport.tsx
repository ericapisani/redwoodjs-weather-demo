import { parseISO, formatISO9075 } from 'date-fns'

const WeatherReport = ({ weatherReport }) => {
  return (
    <div className="border border-gray-300 rounded-md p-6 shadow-sm">
      <p>{weatherReport.worldCity?.city}</p>
      <p>{weatherReport.worldCity?.adminName}</p>
      <p>{weatherReport.worldCity?.country}</p>
      <hr className="my-4" />
      <p>{weatherReport.headline}</p>
      <p>{weatherReport.description}</p>
      <p>
        <img
          src={`http://openweathermap.org/img/wn/${weatherReport.icon}@2x.png`}
          alt={weatherReport.icon}
        ></img>
      </p>
      <p>
        Temp: {weatherReport.tempFahrenheit}&deg;F / {weatherReport.tempCelcius}
        &deg;C (min: {weatherReport.tempMinFahrenheit}&deg;F /{' '}
        {weatherReport.tempMinCelcius}&deg;C | max:{' '}
        {weatherReport.tempMaxFahrenheit}&deg;F / {weatherReport.tempMaxCelcius}
        &deg;C)
      </p>

      <p>
        Feels Like: {weatherReport.feelsLikeFahrenheit}&deg;F /{' '}
        {weatherReport.feelsLikeCelcius}&deg;C
      </p>
      <p>Pressure: {weatherReport.pressure}</p>
      <p>Humidity: {weatherReport.humidity}</p>
      <p>Wind: {weatherReport.windSpeed} m/sec</p>
      <p>Wind Direction: {weatherReport.windDegrees}&deg;</p>
      <p>Sunrise: {formatISO9075(parseISO(weatherReport.sunrise))}</p>
      <p>Sunset: {formatISO9075(parseISO(weatherReport.sunset))}</p>
    </div>
  )
}

export default WeatherReport
