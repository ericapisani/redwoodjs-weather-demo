import { render } from '@redwoodjs/testing/web'

import WeatherReport from './WeatherReport'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WeatherReport', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WeatherReport />)
    }).not.toThrow()
  })
})
