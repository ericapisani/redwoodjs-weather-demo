import type { APIGatewayEvent } from 'aws-lambda'

import { logger } from 'src/lib/logger'

const DEFAULT_GEOLOCATION = {
  lat: 59.3294,
  lng: 18.0686,
  city_ascii: 'Stockholm',
  iso2: 'SE',
  adminName: 'Stockholm',
} // Stockholm, Sweden

export const userGeolocation = (event: APIGatewayEvent) => {
  console.log('RECEIVED HEADERS', event['headers'])
  try {
    const parsedHeaders = JSON.parse(event['headers']['x-user-geo'] || '')
    logger.debug({ custom: parsedHeaders }, 'Parsed User Geolocation headers')
    return parsedHeaders
  } catch {
    return DEFAULT_GEOLOCATION
  }
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
