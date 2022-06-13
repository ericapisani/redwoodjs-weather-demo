// import { Link, routes } from '@redwoodjs/router'
// import { MetaTags } from '@redwoodjs/web'

import { useParams } from '@redwoodjs/router'

import SearchWorldCitiesCell from 'src/components/SearchWorldCitiesCell'

const WorldCitiesPage = () => {
  const { country } = useParams()
  return (
    <>
      <SearchWorldCitiesCell search={{ country: country || 'Sweden' }} />
    </>
  )
}

export default WorldCitiesPage
