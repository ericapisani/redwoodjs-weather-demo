import { Link, routes } from '@redwoodjs/router'
import CountriesCell from 'src/components/CountriesCell'
import CurrentCityCell from 'src/components/CurrentCityCell'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="p-4 bg-gray-100">
      <nav className="flex place-content-center">
        <Link to={routes.home()}>
          <CurrentCityCell />
        </Link>
      </nav>
      {children}
      <footer className="p-4">
        <h3 className="py-4 text-xl">Countries</h3>
        <CountriesCell />
      </footer>
    </main>
  )
}

export default MainLayout
