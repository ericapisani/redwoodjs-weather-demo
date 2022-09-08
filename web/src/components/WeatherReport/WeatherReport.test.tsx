import { render } from '@redwoodjs/testing/web'
import { standard } from '../WorldCityWeatherReportCell/WorldCityWeatherReportCell.mock'

import WeatherReport from './WeatherReport'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WeatherReport', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WeatherReport weatherReport={standard().weatherReport} />)
    }).not.toThrow()
  })
})
