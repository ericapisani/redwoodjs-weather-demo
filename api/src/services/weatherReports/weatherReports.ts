import type {
  QueryResolvers,
  MutationResolvers,
  WeatherReportResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const weatherReports: QueryResolvers['weatherReports'] = () => {
  return db.weatherReport.findMany()
}

export const weatherReport: QueryResolvers['weatherReport'] = ({ id }) => {
  return db.weatherReport.findUnique({
    where: { id },
  })
}
export const createWeatherReport: MutationResolvers['createWeatherReport'] = ({
  input,
}) => {
  return db.weatherReport.create({
    data: input,
  })
}

export const updateWeatherReport: MutationResolvers['updateWeatherReport'] = ({
  id,
  input,
}) => {
  return db.weatherReport.update({
    data: input,
    where: { id },
  })
}

export const deleteWeatherReport: MutationResolvers['deleteWeatherReport'] = ({
  id,
}) => {
  return db.weatherReport.delete({
    where: { id },
  })
}

export const WeatherReport: WeatherReportResolvers = {
  worldCity: (_obj, { root }) =>
    db.weatherReport.findUnique({ where: { id: root.id } }).worldCity(),
}
