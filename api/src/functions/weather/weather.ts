import { logger } from 'src/lib/logger'
import { openWeather } from 'src/lib/openWeather'
import { getWeatherSearchCriteriaFromEvent } from 'src/lib/geoUtils'

import type { APIGatewayEvent } from 'aws-lambda'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment. Unused.
 */
export const handler = async (event: APIGatewayEvent) => {
  logger.info('Invoked weather function')

  const weatherSearchCriteria = getWeatherSearchCriteriaFromEvent(event)

  const weather = await openWeather(weatherSearchCriteria)

  logger.debug(
    { custom: { weather, weatherSearchCriteria } },
    'Current weather'
  )

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      weather,
    }),
  }
}
