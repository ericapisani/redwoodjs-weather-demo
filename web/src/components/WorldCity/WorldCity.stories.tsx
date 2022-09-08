import WorldCity from './WorldCity'
import { standard } from '../WorldCityCell/WorldCityCell.mock'

export const generated = () => {
  return <WorldCity worldCity={standard().worldCity} />
}

export default { title: 'Components/WorldCity' }
