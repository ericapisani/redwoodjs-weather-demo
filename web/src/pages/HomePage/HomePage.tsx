import { MetaTags } from '@redwoodjs/web'

import CurrentWeatherCell from 'src/components/CurrentWeatherCell'
import NearbyWorldCitiesCell from 'src/components/NearbyWorldCitiesCell'
const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1 className="my-4 text-xl">Current Weather</h1>

      <CurrentWeatherCell />

      <h2 className="my-4 text-xl">Nearby Cities</h2>

      <NearbyWorldCitiesCell />
    </>
  )
}
export default HomePage
