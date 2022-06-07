import { MockAgent, setGlobalDispatcher } from 'undici'

import { openWeather } from './openWeather'
describe('OpenWeatherMaps API', () => {
  it('fetch weather from open weather maps api and enriches with temperature conversion', async () => {
    const agent = new MockAgent()

    setGlobalDispatcher(agent)

    agent.disableNetConnect()
    // agent.enableNetConnect()

    const lat = 42.32996014
    const lon = -71.07001367

    const client = agent.get('https://api.openweathermap.org')
    client
      .intercept({
        path: `/data/2.5/weather`,
        query: { lat, lon, appid: process.env.OPEN_WEATHER_API_KEY },
        method: 'GET',
      })
      .reply(200, {
        message: {
          coord: { lon: -71.07, lat: 42.33 },
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: 'scattered clouds',
              icon: '03d',
            },
          ],
          base: 'stations',
          main: {
            temp: 296.82,
            feels_like: 296.26,
            temp_min: 294.25,
            temp_max: 299.54,
            pressure: 1018,
            humidity: 39,
          },
          visibility: 10000,
          wind: { speed: 1.34, deg: 297, gust: 2.68 },
          clouds: { all: 46 },
          dt: 1654527609,
          sys: {
            type: 2,
            id: 2013408,
            country: 'US',
            sunrise: 1654506503,
            sunset: 1654561070,
          },
          timezone: -14400,
          id: 4952349,
          name: 'Suffolk',
          cod: 200,
        },
        status: 'success',
      })
      .persist()

    const enrichedWeather = {
      coord: { lon: -71.07, lat: 42.33 },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
      base: 'stations',
      main: {
        temp_f: 75,
        feels_like_f: 74,
        temp_min_f: 70,
        temp_max_f: 80,
        temp_c: 24,
        feels_like_c: 23,
        temp_min_c: 21,
        temp_max_c: 26,
        temp: 296.82,
        feels_like: 296.26,
        temp_min: 294.25,
        temp_max: 299.54,
        pressure: 1018,
        humidity: 39,
      },
      visibility: 10000,
      wind: { speed: 1.34, deg: 297, gust: 2.68 },
      clouds: { all: 46 },
      dt: 1654527609,
      sys: {
        type: 2,
        id: 2013408,
        country: 'US',
        sunrise: 1654506503,
        sunset: 1654561070,
      },
      timezone: -14400,
      id: 4952349,
      name: 'Suffolk',
      cod: 200,
    }

    const weather = await openWeather({ lat, lon })

    expect(weather).toEqual(enrichedWeather)
  })
})
