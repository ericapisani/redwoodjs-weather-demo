import { parseISO } from 'date-fns'

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
        worldCityId: scenario.weatherReport.two.worldCityId,
        headline: 'String',
        description: 'String',
        icon: 'String',
        tempFahrenheit: 1,
        feelsLikeFahrenheit: 2,
        tempMinFahrenheit: 3,
        tempMaxFahrenheit: 4,
        tempCelcius: 5,
        feelsLikeCelcius: 6,
        tempMinCelcius: 7,
        tempMaxCelcius: 8,
        temp: 9,
        feelsLike: 10,
        tempMin: 11,
        tempMax: 12,
        pressure: 13,
        humidity: 14,
        windSpeed: 15,
        windDegrees: 16,
        sunrise: '2022-06-03T16:44:05Z',
        sunset: '2022-06-03T16:44:05Z',
      },
    })

    expect(result.worldCityId).toEqual(scenario.weatherReport.two.worldCityId)
    expect(result.headline).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.icon).toEqual('String')
    expect(result.tempFahrenheit).toEqual(1)
    expect(result.feelsLikeFahrenheit).toEqual(2)
    expect(result.tempMinFahrenheit).toEqual(3)
    expect(result.tempMaxFahrenheit).toEqual(4)
    expect(result.tempCelcius).toEqual(5)
    expect(result.feelsLikeCelcius).toEqual(6)
    expect(result.tempMinCelcius).toEqual(7)
    expect(result.tempMaxCelcius).toEqual(8)
    expect(result.temp).toEqual(9)
    expect(result.feelsLike).toEqual(10)
    expect(result.tempMin).toEqual(11)
    expect(result.tempMax).toEqual(12)
    expect(result.pressure).toEqual(13)
    expect(result.humidity).toEqual(14)
    expect(result.windSpeed).toEqual(15)
    expect(result.windDegrees).toEqual(16)
    expect(result.sunrise).toEqual(parseISO('2022-06-03T16:44:05Z'))
    expect(result.sunset).toEqual(parseISO('2022-06-03T16:44:05Z'))
  })

  scenario('updates a weatherReport', async (scenario: StandardScenario) => {
    const original = await weatherReport({ id: scenario.weatherReport.one.id })
    const result = await updateWeatherReport({
      id: original.id,
      input: { tempCelcius: 99 },
    })

    expect(result.tempCelcius).toEqual(99)
  })

  scenario('deletes a weatherReport', async (scenario: StandardScenario) => {
    const original = await deleteWeatherReport({
      id: scenario.weatherReport.one.id,
    })
    const result = await weatherReport({ id: original.id })

    expect(result).toEqual(null)
  })
})
