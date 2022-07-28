import { render } from '@redwoodjs/testing/web'

import WorldCityPage from './WorldCityPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WorldCityPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorldCityPage />)
    }).not.toThrow()
  })
})
