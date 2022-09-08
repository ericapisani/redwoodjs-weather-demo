import WeatherReport from './WeatherReport'
import { standard } from '../WorldCityWeatherReportCell/WorldCityWeatherReportCell.mock'

export const generated = () => {
  return <WeatherReport weatherReport={standard().weatherReport} />
}

export default { title: 'Components/WeatherReport' }
