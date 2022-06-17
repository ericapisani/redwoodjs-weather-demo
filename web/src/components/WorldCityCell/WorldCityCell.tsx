import type {
  FindWorldCityQuery,
  FindWorldCityQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import SearchWorldCitiesCell from 'src/components/SearchWorldCitiesCell'
import WorldCity from 'src/components/WorldCity/WorldCity'

export const QUERY = gql`
  query FindWorldCityQuery($id: String!) {
    worldCity: worldCity(id: $id) {
      id
      city
      adminName
      country
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindWorldCityQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  worldCity,
}: CellSuccessProps<FindWorldCityQuery, FindWorldCityQueryVariables>) => {
  return (
    <>
      <WorldCity worldCity={worldCity} />
      <h2>Major Cities in {worldCity.country}</h2>
      <SearchWorldCitiesCell
        search={{ country: worldCity.country || 'Sweden' }}
      />
    </>
  )
}
