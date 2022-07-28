import type {
  FindCurrentWeatherQuery,
  FindCurrentWeatherQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import WeatherReport from 'src/components/WeatherReport/WeatherReport'

export const QUERY = gql`
  query GetCurrentWeather {
    currentWeather {
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
      worldCity {
        id
        city
        adminName
        country
      }
    }
  }
`

export const Loading = () => <div>Getting latest weather ...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindCurrentWeatherQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  currentWeather,
}: CellSuccessProps<
  FindCurrentWeatherQuery,
  FindCurrentWeatherQueryVariables
>) => {
  return <WeatherReport weatherReport={currentWeather} />
}
