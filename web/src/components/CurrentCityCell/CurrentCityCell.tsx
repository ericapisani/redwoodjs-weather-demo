import { LocationMarkerIcon } from '@heroicons/react/solid'
import type {
  FindCurrentCityQuery,
  FindCurrentCityQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindCurrentCityQuery {
    currentCity: currentCity {
      id
      city
    }
  }
`

export const Loading = () => <div>Geolocating ...</div>

export const Empty = () => <div></div>

export const Failure = ({
  error,
}: CellFailureProps<FindCurrentCityQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  currentCity,
}: CellSuccessProps<FindCurrentCityQuery, FindCurrentCityQueryVariables>) => {
  return (
    <div className="flex">
      <LocationMarkerIcon className="h-5 w-5 text-blue-500 animate-pulse" />
      {currentCity.city}
    </div>
  )
}
