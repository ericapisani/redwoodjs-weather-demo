import {
  worldCities,
  worldCity,
  createWorldCity,
  updateWorldCity,
  deleteWorldCity,
} from './worldCities'
import type { StandardScenario } from './worldCities.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('worldCities', () => {
  scenario('returns all worldCities', async (scenario: StandardScenario) => {
    const result = await worldCities()

    expect(result.length).toEqual(Object.keys(scenario.worldCity).length)
  })

  scenario('returns a single worldCity', async (scenario: StandardScenario) => {
    const result = await worldCity({ id: scenario.worldCity.sf.id })

    expect(result).toEqual(scenario.worldCity.sf)
  })

  scenario('creates a worldCity', async () => {
    const result = await createWorldCity({
      input: {
        simpleMapsId: 6859181,
        city: 'String',
        cityAscii: 'String',
        lat: 3346334.673512834,
        lng: 8835234.57459205,
        country: 'String',
        iso2: 'String',
        iso3: 'String',
      },
    })

    expect(result.simpleMapsId).toEqual(6859181n)
    expect(result.city).toEqual('String')
    expect(result.cityAscii).toEqual('String')
    expect(result.lat).toEqual(3346334.673512834)
    expect(result.lng).toEqual(8835234.57459205)
    expect(result.country).toEqual('String')
    expect(result.iso2).toEqual('String')
    expect(result.iso3).toEqual('String')
  })

  scenario('updates a worldCity', async (scenario: StandardScenario) => {
    const original = await worldCity({ id: scenario.worldCity.sf.id })
    const result = await updateWorldCity({
      id: original.id,
      input: { population: 1000 },
    })

    expect(result.population).toEqual(1000)
  })

  scenario('deletes a worldCity', async (scenario: StandardScenario) => {
    const original = await deleteWorldCity({ id: scenario.worldCity.boston.id })
    const result = await worldCity({ id: original.id })

    expect(result).toEqual(null)
  })
})
