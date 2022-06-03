import { logger } from 'src/lib/logger'
import { fetch } from 'cross-undici-fetch'

export const openWeather = async ({ lat, lon }) => {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    logger.error('Missing OPEN_WEATHER_API_KEY')
    throw new Error('An api key for the Open Weather Maps API is required.')
  }

  const request = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`

  logger.debug(
    { custom: { lat, lon, request } },
    'Fetching weather for geocoordinates ...'
  )

  const res = await fetch(request)

  const json = await res.json()

  if (json['cod'] === 401) {
    logger.error(json['message'])
    throw new Error(json['message'])
  }

  if (json['cod'] === 200) {
    logger.debug({ custom: { lat, lon, request, json } }, 'Fetched weather.')

    return json
  }

  throw new Error('Unable to fetch weather')
}
