// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import WorldCityCell from 'src/components/WorldCityCell'
import WorldCityWeatherReportCell from 'src/components/WorldCityWeatherReportCell'

const WorldCityPage = ({ id }) => {
  return (
    <>
      <MetaTags title="WorldCity" description="WorldCity page" />

      <h1 className="text-xl">City</h1>
      <WorldCityCell id={id} />
      <WorldCityWeatherReportCell worldCityId={id} />
    </>
  )
}

export default WorldCityPage
