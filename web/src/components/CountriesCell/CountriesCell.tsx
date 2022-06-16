import { GlobeIcon } from '@heroicons/react/outline'
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
          <li
            key={item.country}
            className="rounded-md border border-1 border-solid border-gray-300 p-4 flex justify-items-center hover:bg-gray-200"
          >
            <Link
              className="text-gray-700 flex"
              to={routes.worldCities({ country: item.country })}
            >
              <GlobeIcon className="mr-2 h-6 w-6 text-gray-500 content-center" />
              {item.country}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
