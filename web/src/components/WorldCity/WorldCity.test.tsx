import { render } from '@redwoodjs/testing/web'

import WorldCity from './WorldCity'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WorldCity', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorldCity />)
    }).not.toThrow()
  })
})
