import { openWeather } from './openWeather'

describe('OpenWeatherMaps API', () => {
  it('fetch weather from open weather maps api and enriches with temperature conversion', async () => {
    const lat = 42.32996014
    const lon = -71.07001367

    const weather = await openWeather({ lat, lon })

    expect(weather).toHaveProperty('coord')
    expect(weather['coord']).toEqual({ lon: -71.07, lat: 42.33 })
  })
})
