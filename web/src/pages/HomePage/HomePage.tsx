import { MetaTags } from '@redwoodjs/web'

import NearbyWorldCitiesCell from 'src/components/NearbyWorldCitiesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1 className="my-4 text-xl">Nearby Cities</h1>

      <NearbyWorldCitiesCell />
    </>
  )
}
export default HomePage
