import { Link, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="p-4">
      <nav>
        <ul className="grid grid-cols grid-cols-4 gap-4">
          <li>
            <Link to={routes.home()}>Nearby</Link>
          </li>
          <li>
            <Link to={routes.worldCities({ country: 'Sweden' })}>Sweden</Link>
          </li>
          <li>
            <Link to={routes.worldCities({ country: 'United States' })}>
              United States
            </Link>
          </li>
          <li>
            <Link to={routes.worldCities({ country: 'Canada' })}>Canada</Link>
          </li>
          <li>
            <Link to={routes.worldCities({ country: 'Mexico' })}>Mexico</Link>
          </li>
          <li>
            <Link to={routes.worldCities({ country: 'South Africa' })}>
              South Africa
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  )
}

export default MainLayout
