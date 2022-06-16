// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import WorldCityCell from 'src/components/WorldCityCell'
import WorldCityWeatherReportCell from 'src/components/WorldCityWeatherReportCell'

const WorldCityPage = ({ id }) => {
  return (
    <>
      <MetaTags title="WorldCity" description="WorldCity page" />

      <h1 className="text-xl">Weather Report</h1>
      <WorldCityWeatherReportCell worldCityId={id} />

      <h1 className="text-xl">City Info</h1>
      <WorldCityCell id={id} />
    </>
  )
}

export default WorldCityPage
