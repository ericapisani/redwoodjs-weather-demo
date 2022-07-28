import { render } from '@redwoodjs/testing/web'

import WorldCitiesPage from './WorldCitiesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WorldCitiesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorldCitiesPage />)
    }).not.toThrow()
  })
})
