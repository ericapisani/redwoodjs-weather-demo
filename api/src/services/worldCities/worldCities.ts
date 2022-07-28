import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

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
