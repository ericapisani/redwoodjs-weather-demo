// Taken from https://github.com/larryhudson/local-date-edge-function/blob/main/netlify/edge-functions/local-date.js
// and modified slightly when converting the code to Typescript

// import city-timezones NPM package using esm.sh CDN
import cityTimezones from "https://esm.sh/city-timezones@v1.2.0";
import type { Context } from "netlify:edge";

function getLocalDate(utcDate: Date, geoInfo: Context["geo"]) {
  const locationString = `${geoInfo.city} ${geoInfo.subdivision?.name} ${geoInfo.country?.name}`
  const timezones = cityTimezones.findFromCityStateProvince(locationString);

  if (timezones.length > 0) {
    const timezoneName = timezones[0].timezone;
    return utcDate.toLocaleString("en-US", { timeZone: timezoneName });
  } else {
    // no timezone found
    return null;
  }
}

export default async (request: Request, context: Context) => {
  const utcDate = new Date();

  const localDate = getLocalDate(utcDate, context.geo);
  request.headers.set('x-user-local-datetime', localDate || '')

  return context.next();
};
