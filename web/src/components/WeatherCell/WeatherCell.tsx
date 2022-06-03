import type { FindWeatherQuery, FindWeatherQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query CityByName {
    weather: searchWorldCities(search: {}) {
      city
      country
      lat
      lng
      adminName
      population
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindWeatherQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  weather,
}: CellSuccessProps<FindWeatherQuery, FindWeatherQueryVariables>) => {
  return <div>{JSON.stringify(weather)}</div>
}
