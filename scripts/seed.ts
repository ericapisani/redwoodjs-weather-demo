import fs from 'fs'

import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    console.info(`Loading world cities ...`)

    const cities: Prisma.WorldCityCreateInput[] = JSON.parse(
      fs.readFileSync('./scripts/data/world_cities.json', 'utf8')
    )

    console.info(`Loaded ${cities.length} world cities.`)
    console.info(`Saving ${cities.length} world cities ...`)

    await db.worldCity.createMany({ data: cities })

    console.info(`Done!`)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
