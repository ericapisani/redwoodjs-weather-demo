import { formatISO, subMinutes } from 'date-fns'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import {
  getUserWorldCitySearchCriteria,
  geocoordinates,
} from 'src/lib/geoUtils'

import { worldCity } from 'src/services/worldCities'

import { openWeather } from 'src/lib/openWeather'

import type {
  CreateWeatherReportInput,
  QueryResolvers,
  WorldCity,
} from 'types/graphql'

import type { APIGatewayEvent } from 'aws-lambda'

const getDefaultSearchCriteria = (search) => {
  let criteria = {}

  const worldCitySearch = getUserWorldCitySearchCriteria(
    context.event as APIGatewayEvent
  )

  logger.debug({ custom: worldCitySearch }, 'Default search world cities.')

  const c = Object.values(search).filter((v) => v !== undefined)

  if (c.length > 0) {
    criteria = search
  } else {
    criteria = worldCitySearch
  }

  logger.debug({ custom: criteria }, 'Searching for world cities.')

  return criteria
}

export const searchWorldCities: QueryResolvers['searchWorldCities'] = async ({
  search,
}) => {
  logger.debug({ custom: search }, 'Specified search world cities.')

  const criteria = getDefaultSearchCriteria(search)

  return await db.worldCity.findMany({
    where: {
      ...criteria,
    },
    orderBy: [{ population: 'desc' }, { city: 'asc' }, { country: 'asc' }],
    take: 10,
  })
}

export const nearbyWorldCities: QueryResolvers['nearbyWorldCities'] = () => {
  const { lat, lng } = geocoordinates(context.event as APIGatewayEvent)

  logger.debug({ custom: { lat, lng } }, 'Geocoordinates')

  const nearbyFactor = 1

  const nearbyClause = [
    { lat: { gte: lat - nearbyFactor } },
    { lat: { lte: lat + nearbyFactor } },
    { lng: { gte: lng - nearbyFactor } },
    { lng: { lte: lng + nearbyFactor } },
  ]

  logger.debug({ custom: nearbyClause }, 'nearbyClause to find nearby cities')

  return db.worldCity.findMany({
    where: {
      AND: nearbyClause,
    },
    orderBy: { population: 'desc' },
    take: 10,
  })
}

const weatherToReport = ({ worldCityId, weather }) => {
  const input: CreateWeatherReportInput = {
    worldCity: { connect: { id: worldCityId } },
    headline: weather.weather[0].main,
    description: weather.weather[0].description,
    icon: weather.weather[0].icon,
    tempFahrenheit: weather.main.temp_f,
    feelsLikeFahrenheit: weather.main.feels_like_f,
    tempMinFahrenheit: weather.main.temp_min_f,
    tempMaxFahrenheit: weather.main.temp_max_f,
    tempCelcius: weather.main.temp_c,
    feelsLikeCelcius: weather.main.feels_like_c,
    tempMinCelcius: weather.main.temp_min_c,
    tempMaxCelcius: weather.main.temp_max_c,
    temp: weather.main.temp,
    feelsLike: weather.main.feels_like,
    tempMin: weather.main.temp_min,
    tempMax: weather.main.temp_max,
    pressure: weather.main.pressure,
    humidity: weather.main.humidity,
    windSpeed: weather.wind.speed || 0,
    windDegrees: weather.wind.deg || 0,
    sunrise: formatISO(new Date(weather.sys.sunrise * 1000)),
    sunset: formatISO(new Date(weather.sys.sunset * 1000)),
  }

  return input
}

const getWeatherReport = async ({ worldCityId, weatherSearchCriteria }) => {
  const weather = await openWeather(weatherSearchCriteria)
  logger.debug({ custom: weather }, 'Weather fetched for worldCityId')

  const input = weatherToReport({ worldCityId, weather })

  const newReport = await db.weatherReport.create({
    data: input,
  })

  logger.debug({ custom: newReport }, 'Weather fetched for worldCityId')

  return newReport
}

export const worldCityWeatherReport: QueryResolvers['worldCityWeatherReport'] =
  async ({ worldCityId }) => {
    logger.debug(
      { custom: worldCityId },
      'Searching for weather report for worldCityId'
    )
    const reports = await db.weatherReport.findMany({
      where: { worldCityId, createdAt: { gt: subMinutes(new Date(), 2) } },
      include: { worldCity: true },
      orderBy: { createdAt: 'desc' },
      take: 1,
    })

    const report = reports[0]

    if (report) {
      logger.debug({ custom: report }, 'Report found for worldCityId')
      return report
    } else {
      logger.debug({ custom: worldCityId }, 'Report NOT found for worldCityId')
      const city = await worldCity({ id: worldCityId })

      const weatherSearchCriteria = { lat: city.lat, lon: city.lng }

      return await getWeatherReport({ worldCityId, weatherSearchCriteria })
    }
  }

export const currentWeather: QueryResolvers['currentWeather'] = async () => {
  const weatherSearchCriteria = getUserWorldCitySearchCriteria(
    context?.event as APIGatewayEvent
  )

  logger.debug({ custom: weatherSearchCriteria }, 'weatherSearchCriteria')

  const worldCities = await searchWorldCities({
    search: {
      cityAscii: weatherSearchCriteria.city,
      iso2: weatherSearchCriteria.iso2,
      adminName: weatherSearchCriteria.adminName,
    },
  })

  logger.debug({ custom: worldCities }, 'worldCities')

  const worldCity = worldCities[0] as unknown as WorldCity

  logger.debug({ custom: worldCity }, 'worldCities')

  return await worldCityWeatherReport({ worldCityId: worldCity.id })
}
