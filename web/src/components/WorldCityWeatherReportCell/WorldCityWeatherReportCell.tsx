// import type { WeatherReport } from 'types/graphql'
// import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import WeatherReport from 'src/components/WeatherReport/WeatherReport'

export const QUERY = gql`
  query FindWorldCityWeatherReportQuery($worldCityId: String!) {
    weatherReport: worldCityWeatherReport(worldCityId: $worldCityId) {
      id
      createdAt
      updatedAt
      worldCityId
      headline
      description
      icon
      tempFahrenheit
      feelsLikeFahrenheit
      tempMinFahrenheit
      tempMaxFahrenheit
      tempCelcius
      feelsLikeCelcius
      tempMinCelcius
      tempMaxCelcius
      temp
      feelsLike
      tempMin
      tempMax
      pressure
      humidity
      windSpeed
      windDegrees
      sunrise
      sunset
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  // : CellFailureProps<QueryworldCityWeatherReportArgs>)
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ weatherReport }) =>
  //  CellSuccessProps<WeatherReport, QueryworldCityWeatherReportArgs>)
  {
    return <WeatherReport weatherReport={weatherReport} />
  }
