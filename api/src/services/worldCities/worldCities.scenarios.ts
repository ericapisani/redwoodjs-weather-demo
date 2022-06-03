import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WorldCityCreateArgs>({
  worldCity: {
    one: {
      data: {
        updatedAt: '2022-06-03T16:47:01Z',
        simpleMapsId: 1776165,
        city: 'String',
        cityAscii: 'String',
        lat: 9594798.203191329,
        lng: 5300311.486525955,
        country: 'String',
        iso2: 'String',
        iso3: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-06-03T16:47:01Z',
        simpleMapsId: 808245,
        city: 'String',
        cityAscii: 'String',
        lat: 3404976.699494686,
        lng: 4773088.548675062,
        country: 'String',
        iso2: 'String',
        iso3: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
