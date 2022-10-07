import { render } from '@redwoodjs/testing/web'

import WorldCity from './WorldCity'
import { standard } from '../CurrentCityCell/CurrentCityCell.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WorldCity', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorldCity worldCity={standard().currentCity} />)
    }).not.toThrow()
  })
})
