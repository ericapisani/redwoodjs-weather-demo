import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  // TODO: Make request for weather
  const date = request.headers.get('x-user-local-datetime')?.split(',')[0] || ''
  const location = `${request.headers.get('x-user-city')}, ${request.headers.get('x-user-country')}`

  return context.json({success: `Forecast for ${location} on ${date} is <weather forecast here>`})
};
