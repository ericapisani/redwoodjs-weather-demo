import { logger } from 'src/lib/logger'
import { fetch } from 'undici'

const convertKtoC = (k) => {
  return Math.round(k - 273.15)
}

const convertKtoF = (k) => {
  return Math.round((k - 273.15) * (9 / 5) + 32)
}

const convertTemps = (main) => {
  const temp_f = convertKtoF(main.temp)
  const feels_like_f = convertKtoF(main.feels_like)
  const temp_min_f = convertKtoF(main.temp_min)
  const temp_max_f = convertKtoF(main.temp_max)

  const temp_c = convertKtoC(main.temp)
  const feels_like_c = convertKtoC(main.feels_like)
  const temp_min_c = convertKtoC(main.temp_min)
  const temp_max_c = convertKtoC(main.temp_max)

  const convertedTemps = {
    main: {
      temp_f,
      feels_like_f,
      temp_min_f,
      temp_max_f,
      temp_c,
      feels_like_c,
      temp_min_c,
      temp_max_c,
      ...main,
    },
  }

  logger.debug({ custom: { convertedTemps } }, 'Converted weather temps.')

  return convertedTemps
}

export const openWeather = async ({ lat, lon }) => {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    logger.error('Missing OPEN_WEATHER_API_KEY')
    throw new Error('An api key for the Open Weather Maps API is required.')
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=standard&appid=${process.env.OPEN_WEATHER_API_KEY}` // ?

  logger.debug(
    { custom: { lat, lon, url } },
    'Fetching weather for geocoordinates ...'
  )

  const res = await fetch(url)

  const json = (await res.json()) as Object

  if (json['cod'] === 401) {
    logger.error(json['message'])
    throw new Error(json['message'])
  }

  if (json['cod'] === 200) {
    const main = convertTemps(json['main'])
    const enrichedWeather = { ...json, ...main }

    logger.debug(
      { custom: { lat, lon, url, json, enrichedWeather } },
      'Fetched weather.'
    )

    return enrichedWeather
  }

  throw new Error('Unable to fetch weather')
}
