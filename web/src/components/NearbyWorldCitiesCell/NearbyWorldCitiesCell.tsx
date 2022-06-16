import type { NearbyWorldCitiesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import WorldCity from 'src/components/WorldCity/WorldCity'

export const QUERY = gql`
  query NearbyWorldCitiesQuery {
    nearbyWorldCities {
      id
      city
      adminName
      country
    }
  }
`

export const Loading = () => <div>Searching ...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  nearbyWorldCities,
}: CellSuccessProps<NearbyWorldCitiesQuery>) => {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-6">
      {nearbyWorldCities.map((item) => {
        return (
          <li key={item.id}>
            <WorldCity worldCity={item} />
          </li>
        )
      })}
    </ul>
  )
}
