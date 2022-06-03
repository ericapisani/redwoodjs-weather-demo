import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { getUserWorldCitySearchCriteria } from 'src/lib/geoUtils'

import type { QueryResolvers } from 'types/graphql'

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

export const searchWorldCities: QueryResolvers['searchWorldCities'] = ({
  search,
}) => {
  logger.debug({ custom: search }, 'Specified search world cities.')

  const criteria = getDefaultSearchCriteria(search)

  return db.worldCity.findMany({
    where: {
      ...criteria,
    },
    orderBy: [{ city: 'asc' }, { country: 'asc' }],
    take: 10,
  })
}
