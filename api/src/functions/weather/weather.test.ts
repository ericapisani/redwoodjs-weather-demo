import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './weather'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('weather function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({
      headers: {
        'x-user-geo': JSON.stringify({ lat: 1, lng: 2 }),
      },
    })

    const response = await handler(httpEvent)
    const { weather } = JSON.parse(response.body)

    expect(response.statusCode).toEqual(200)
    expect(weather).toHaveProperty('weather')
    expect(weather).toHaveProperty('coord')
    expect(weather.coord.lat).toEqual(1)
    expect(weather.coord.lon).toEqual(2)
  })
})
