import { Link, routes } from '@redwoodjs/router'

import type { CountriesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query CountriesQuery {
    countries {
      country
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ countries }: CellSuccessProps<CountriesQuery>) => {
  return (
    <ul className="grid grid-cols grid-cols-4 gap-4">
      {countries.map((item) => {
        return (
          <li key={item.country}>
            <Link to={routes.worldCities({ country: item.country })}>
              {item.country}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
