import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  request.headers.set('x-user-city', context.geo.city || '')
  request.headers.set('x-user-country', context.geo.country?.name || '')

  return context.next()
};
