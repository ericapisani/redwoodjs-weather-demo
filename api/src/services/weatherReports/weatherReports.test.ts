import {
  weatherReports,
  weatherReport,
  createWeatherReport,
  updateWeatherReport,
  deleteWeatherReport,
} from './weatherReports'
import type { StandardScenario } from './weatherReports.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('weatherReports', () => {
  scenario('returns all weatherReports', async (scenario: StandardScenario) => {
    const result = await weatherReports()

    expect(result.length).toEqual(Object.keys(scenario.weatherReport).length)
  })

  scenario(
    'returns a single weatherReport',
    async (scenario: StandardScenario) => {
      const result = await weatherReport({ id: scenario.weatherReport.one.id })

      expect(result).toEqual(scenario.weatherReport.one)
    }
  )

  scenario('creates a weatherReport', async (scenario: StandardScenario) => {
    const result = await createWeatherReport({
      input: {
        updatedAt: '2022-06-03T16:44:05Z',
        worldCityId: scenario.weatherReport.two.worldCityId,
        headline: 'String',
        description: 'String',
        icon: 'String',
        tempFahrenheit: 5351428,
        feelsLikeFahrenheit: 5175333,
        tempMinFahrenheit: 6633727,
        tempMaxFahrenheit: 4799404,
        tempCelcius: 6617942,
        feelsLikeCelcius: 4601742,
        tempMinCelcius: 2679296,
        tempMaxCelcius: 7520487,
        temp: 2895723.2848315663,
        feelsLike: 3320296.515018777,
        tempMin: 6336763.512201682,
        tempMax: 6531897.525755235,
        pressure: 3791480,
        humidity: 2870337,
        windSpeed: 9290625.019794878,
        windDegrees: 7610404,
        sunrise: '2022-06-03T16:44:05Z',
        sunset: '2022-06-03T16:44:05Z',
      },
    })

    expect(result.updatedAt).toEqual('2022-06-03T16:44:05Z')
    expect(result.worldCityId).toEqual(scenario.weatherReport.two.worldCityId)
    expect(result.headline).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.icon).toEqual('String')
    expect(result.tempFahrenheit).toEqual(5351428)
    expect(result.feelsLikeFahrenheit).toEqual(5175333)
    expect(result.tempMinFahrenheit).toEqual(6633727)
    expect(result.tempMaxFahrenheit).toEqual(4799404)
    expect(result.tempCelcius).toEqual(6617942)
    expect(result.feelsLikeCelcius).toEqual(4601742)
    expect(result.tempMinCelcius).toEqual(2679296)
    expect(result.tempMaxCelcius).toEqual(7520487)
    expect(result.temp).toEqual(2895723.2848315663)
    expect(result.feelsLike).toEqual(3320296.515018777)
    expect(result.tempMin).toEqual(6336763.512201682)
    expect(result.tempMax).toEqual(6531897.525755235)
    expect(result.pressure).toEqual(3791480)
    expect(result.humidity).toEqual(2870337)
    expect(result.windSpeed).toEqual(9290625.019794878)
    expect(result.windDegrees).toEqual(7610404)
    expect(result.sunrise).toEqual('2022-06-03T16:44:05Z')
    expect(result.sunset).toEqual('2022-06-03T16:44:05Z')
  })

  scenario('updates a weatherReport', async (scenario: StandardScenario) => {
    const original = await weatherReport({ id: scenario.weatherReport.one.id })
    const result = await updateWeatherReport({
      id: original.id,
      input: { updatedAt: '2022-06-04T16:44:05Z' },
    })

    expect(result.updatedAt).toEqual('2022-06-04T16:44:05Z')
  })

  scenario('deletes a weatherReport', async (scenario: StandardScenario) => {
    const original = await deleteWeatherReport({
      id: scenario.weatherReport.one.id,
    })
    const result = await weatherReport({ id: original.id })

    expect(result).toEqual(null)
  })
})
