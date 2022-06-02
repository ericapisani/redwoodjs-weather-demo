import fs from 'fs'

import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

/**
 * Batch the `items` array into multiple, smaller array chunks for a batch size
 *
 * @param {Array} items
 * @param {Number} batchSize
 *
 * @returns {Array[]}
 */
const inBatches = (items, batchSize) => {
  const chunks = []
  items = [].concat(...items)

  while (items.length) {
    chunks.push(items.splice(0, batchSize))
  }

  return chunks
}
export default async () => {
  try {
    const count = await db.worldCity.count()

    if (count > 0) {
      throw new Error('World Cities already exist.')
    }
  } catch (error) {
    console.warn('Did not overwrite existing data.')
    console.error(error)
    return
  }

  try {
    console.info(`Loading world cities ...`)

    const cities: Prisma.WorldCityCreateInput[] = JSON.parse(
      fs.readFileSync('./scripts/data/world_cities.json', 'utf8')
    )

    console.info(`Loaded ${cities.length} world cities.`)

    for (const batchOfCities of inBatches(cities, 10_000)) {
      console.info(`Saving ${batchOfCities.length} world cities ...`)
      console.info(`First city in batch: '${batchOfCities[0].city}'`)
      await db.worldCity.createMany({ data: batchOfCities })
    }

    console.info(`Done!`)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
