import { Link, routes } from '@redwoodjs/router'
import CountriesCell from 'src/components/CountriesCell'
type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="p-4">
      <nav>
        <ul className="grid grid-cols grid-cols-4 gap-4">
          <li>
            <Link to={routes.home()}>Your Weather</Link>
          </li>
        </ul>
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
