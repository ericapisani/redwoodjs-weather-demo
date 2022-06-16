import { Link, routes } from '@redwoodjs/router'

const WorldCity = ({ worldCity }) => {
  return (
    <Link to={routes.worldCity({ id: worldCity.id })}>
      <div className="border border-gray-300 rounded-md p-6 shadow-sm">
        <h3 className="text-lg font-bold">{worldCity.city}</h3>
        <p className="text-sm">{worldCity.adminName}</p>
        <p className="text-sm">
          <Link to={routes.worldCities({ country: worldCity.country })}>
            {worldCity.country}
          </Link>
        </p>
      </div>
    </Link>
  )
}

export default WorldCity
