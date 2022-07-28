import { mockHttpEvent } from '@redwoodjs/testing/api'

import {
  userGeolocation,
  geocoordinates,
  getWeatherSearchCriteriaFromEvent,
  getUserWorldCitySearchCriteria,
} from './geoUtils'

const GEO_HEADERS = JSON.stringify({
  city: 'Boston',
  city_ascii: 'Boston',
  lat: 42.32996014,
  lng: -71.07001367,
  pop: 2528070.5,
  country: 'United States of America',
  iso2: 'US',
  iso3: 'USA',
  province: 'Massachusetts',
  state_ansi: 'MA',
  timezone: 'America/New_York',
  localDateTime: '6/6/2022, 10:02:44 AM',
})

const mockedGeolocatedEvent = mockHttpEvent({
  headers: {
    'x-user-geo': GEO_HEADERS,
  },
})

describe('Geolocation utilities', () => {
  it('Should parse the geolocation header data from a geolocated event', async () => {
    const parsedHeaders = userGeolocation(mockedGeolocatedEvent)

    expect(JSON.parse(GEO_HEADERS)).toEqual(parsedHeaders)
  })

  it('Should build weather search criteria from a geolocated event', async () => {
    const criteria = getWeatherSearchCriteriaFromEvent(mockedGeolocatedEvent)

    expect({ lat: 42.32996014, lon: -71.07001367 }).toEqual(criteria)
  })

  it('Should build world city search criteria from a geolocated event', async () => {
    const criteria = getUserWorldCitySearchCriteria(mockedGeolocatedEvent)

    expect({
      city: 'Boston',
      adminName: 'Massachusetts',
      iso2: 'US',
    }).toEqual(criteria)
  })

  it('Should build geocoordinates from a geolocated event', async () => {
    const criteria = geocoordinates(mockedGeolocatedEvent)

    expect({ lat: 42.32996014, lng: -71.07001367 }).toEqual(criteria)
  })
})
