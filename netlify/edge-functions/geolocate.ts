// import city-timezones NPM package using esm.sh CDN
import cityTimezones from 'https://esm.sh/city-timezones@v1.2.0'
import type { Context } from 'netlify:edge'

const DEFAULT_LOCATION = {
  city: 'San Francisco',
  city_ascii: 'San Francisco',
  lat: 37.74000775,
  lng: -122.4599777,
  pop: 2091036,
  country: 'United States of America',
  iso2: 'US',
  iso3: 'USA',
  province: 'California',
  state_ansi: 'CA',
  timezone: 'America/Los_Angeles',
}

const getCityTimezone = (geoInfo: Context['geo']) => {
  // This method will return any partial match for the search term based on city, province, or country, or a combination thereof.
  // A U.S. based city will also return matches for the state_ansi property.
  // See: https://github.com/kevinroberts/city-timezones#citytimezonesfindfromcitystateprovincesearchstring-string
  const searchString = `${geoInfo.city} ${geoInfo.subdivision?.name} ${geoInfo.country?.name}`
  const timezones = cityTimezones.findFromCityStateProvince(searchString)

  return timezones[0] || DEFAULT_LOCATION
}

const getLocalDate = (timeZone: string) => {
  const utcDate = new Date()
  return utcDate.toLocaleString('en-US', { timeZone })
}

export default async (request: Request, context: Context) => {
  const cityTimeZone = getCityTimezone(context.geo)
  cityTimeZone['localDateTime'] = getLocalDate(cityTimeZone.timeZone)

  context.log(cityTimeZone)

  request.headers.set(`x-user-geo`, JSON.stringify(cityTimeZone))

  context.log('Done')

  return context.next()
}
