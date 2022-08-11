import { db } from 'src/lib/db'
// import { logger } from 'src/lib/logger'

export const countries = async () => {
  const results = await db.worldCity.findMany({
    select: { country: true, iso2: true, iso3: true },
    orderBy: { country: 'asc' },
    distinct: ['country', 'iso2', 'iso3'],
  })

  // logger.debug({ custom: results }, 'Countries')

  return results
}
