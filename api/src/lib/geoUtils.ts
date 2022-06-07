import { logger } from 'src/lib/logger'

import type { APIGatewayEvent } from 'aws-lambda'

export const userGeolocation = (event: APIGatewayEvent) => {
  const parsedHeaders = JSON.parse(event['headers']['x-user-geo'] || '') // ?
  logger.debug({ custom: parsedHeaders }, 'Parsed User Geolocation headers')
  return parsedHeaders
}

export const getWeatherSearchCriteriaFromEvent = (event: APIGatewayEvent) => {
  const geo = userGeolocation(event)
  return { lat: geo.lat, lon: geo.lng }
}

export const getUserWorldCitySearchCriteria = (event: APIGatewayEvent) => {
  const geo = userGeolocation(event as APIGatewayEvent)

  return {
    city: geo.city_ascii,
    adminName: geo.province,
    iso2: geo.iso2,
  }
}

export const geocoordinates = (event: APIGatewayEvent) => {
  const geo = userGeolocation(event as APIGatewayEvent)

  return {
    lat: geo.lat,
    lng: geo.lng,
  }
}
