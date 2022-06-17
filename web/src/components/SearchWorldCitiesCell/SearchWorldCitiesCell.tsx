import type {
  SearchWorldCitiesQuery,
  // SearchWorldCityInput,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import WorldCity from 'src/components/WorldCity/WorldCity'

export const QUERY = gql`
  query SearchWorldCitiesQuery($search: SearchWorldCityInput) {
    searchWorldCities(search: $search) {
      id
      city
      adminName
      country
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  searchWorldCities,
}: CellSuccessProps<SearchWorldCitiesQuery>) => {
  return (
    <ul className="grid grid-cols-4 gap-4 sm:grid-cols-2">
      {searchWorldCities.map((item) => {
        return (
          <li key={item.id}>
            <WorldCity worldCity={item} />
          </li>
        )
      })}
    </ul>
  )
}
