import { Link, routes } from '@redwoodjs/router'

const WorldCity = ({ worldCity }) => {
  return (
    <Link to={routes.worldCity({ id: worldCity.id })}>
      <div className="border border-gray-300 rounded-md p-6 shadow-sm">
        <h3>{worldCity.city}</h3>
        <p>{worldCity.adminName}</p>
        <p>{worldCity.country}</p>
      </div>
    </Link>
  )
}

export default WorldCity
