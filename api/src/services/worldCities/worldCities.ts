import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

export const worldCities: QueryResolvers['worldCities'] = () => {
  return db.worldCity.findMany({ orderBy: { city: 'asc' } })
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
