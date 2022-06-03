import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { getUserWorldCitySearchCriteria } from 'src/lib/geoUtils'

import type { APIGatewayEvent } from 'aws-lambda'

import type { QueryResolvers, MutationResolvers } from 'types/graphql'

export const searchWorldCities: QueryResolvers['searchWorldCities'] = ({
  search,
}) => {
  const worldCitySearch = getUserWorldCitySearchCriteria(
    context.event as APIGatewayEvent
  )

  logger.debug({ custom: worldCitySearch }, 'Searching for world cities.')

  return db.worldCity.findMany({
    where: {
      ...worldCitySearch,
      ...search,
    },
    orderBy: [{ city: 'asc' }, { country: 'asc' }],
    take: 10,
  })
}

export const worldCities: QueryResolvers['worldCities'] = () => {
  return db.worldCity.findMany({
    orderBy: [{ city: 'asc' }, { country: 'asc' }],
  })
}

export const worldCity: QueryResolvers['worldCity'] = ({ id }) => {
  return db.worldCity.findUnique({
    where: { id },
  })
}

export const createWorldCity: MutationResolvers['createWorldCity'] = ({
  input,
}) => {
  return db.worldCity.create({
    data: input,
  })
}

export const updateWorldCity: MutationResolvers['updateWorldCity'] = ({
  id,
  input,
}) => {
  return db.worldCity.update({
    data: input,
    where: { id },
  })
}

export const deleteWorldCity: MutationResolvers['deleteWorldCity'] = ({
  id,
}) => {
  return db.worldCity.delete({
    where: { id },
  })
}
