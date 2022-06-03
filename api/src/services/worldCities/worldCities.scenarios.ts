import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WorldCityCreateArgs>({
  worldCity: {
    sf: {
      data: {
        city: 'San Francisco',
        cityAscii: 'San Francisco',
        lat: 37.7562,
        lng: -122.443,
        country: 'United States',
        iso2: 'US',
        iso3: 'USA',
        adminName: 'California',
        capital: '',
        population: 3603761,
        simpleMapsId: 1840021543,
      },
    },
    boston: {
      data: {
        city: 'Boston',
        cityAscii: 'Boston',
        lat: 42.3188,
        lng: -71.0846,
        country: 'United States',
        iso2: 'US',
        iso3: 'USA',
        adminName: 'Massachusetts',
        capital: 'admin',
        population: 4637537,
        simpleMapsId: 1840000455,
      },
    },
  },
})

export type StandardScenario = typeof standard
