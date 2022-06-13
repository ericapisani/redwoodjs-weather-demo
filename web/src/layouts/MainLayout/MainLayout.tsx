import { Link, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="p-4">
      <nav>
        <Link to={routes.home()}>Home</Link>
      </nav>
      {children}
    </main>
  )
}

export default MainLayout
