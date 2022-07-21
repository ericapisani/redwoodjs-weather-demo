# README

Run with `netlify dev` locally instead of `yarn rw dev` to test Netlify Edge Functions.

Note: If editing code while running `netlify dev`, the API server will try to restart but may get a warning that port is in use. You will need to stop and restart `netlify dev` manually.

## Requirements
* A Netlify account. Sign up for free [here](https://app.netlify.com/signup).
* An OpenWeather API key. Get one [here](https://openweathermap.org/api).
* A Postgres database. You can either set one up locally, or use [Railway](https://railway.app/) to provision a temporary one.

## Dataset

The example uses the [World Cities Dataset](https://simplemaps.com/data/world-cities) from [SimpleMaps](https://simplemaps.com) which "contains demographic details of about 15,000 cities around the world. The location of the cities, the countries to which the City belongs to, its populations etc."

[Attribution 4.0 International (CC BY 4.0.)](https://creativecommons.org/licenses/by/4.0/)

## Schema

* `WorldCity`

```ts
 type WorldCity {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    simpleMapsId: BigInt!
    city: String!
    cityAscii: String!
    lat: Float!
    lng: Float!
    country: String!
    iso2: String!
    iso3: String!
    adminName: String
    capital: String
    population: Int
  }
```

## Database setup

It's recommended to use [`Postgres`] for your database so the schema can use `BigInt` and `Float` nicely.

Also, the seed script uses Prisma's [`createMany()`](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany) to bulk load records in batches which is significantly faster that loading data row by row -- which is important because we have ~43,000 world cities in the dataset.

Unfortunately, `createMany` is not supported by SQLite.

### Setting up a database locally

#### OSX

The easiest way to get Postgres up ad running locally on OSX is [Postres.app](https://postgresapp.com).

You can then set you database configuration settings to two different local databases, like:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/redwoodjs-weather-demo-test
TEST_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/redwoodjs-weather-demo-test
```

### Setting up a database on Railway


If you'd rather not worry about setting up a Postgres database on your computer, you can easily provision a Postgres database on [Railway for free](https://railway.app/)(for 24 hours).

After provisioning a database on Railway, copy the 'database connection URL' that Railway provides. You can then use this as your `DATABASE_URL` value in your local environment.

To apply the Prisma schema to the provisioned databse, run `yarn rw prisma db push`.

To run the seed script that populates the provisioned database, run `yarn rw prisma db seed`.

## GraphQL queries

While RedwoodJS ships with a developer GraphQL Playground, when running the app under `netlfiy cli`, the playground doesn't launch properly.

Instead, try using a GraphQL IDE like [Paw](https://paw.cloud) or [Insomnia](https://insomnia.rest).

### Get all world cities

```ts
query AllCities {
  worldCities {
    id
    city
    cityAscii
    country
    lat
    lng
  }
}
```


### Search world cities

```ts
query CityByName {
  searchWorldCities(search: { city: "Boston" }) {
    city
    country
    lat
    lng
    adminName
    population
  }
}
```


### City By Id

```ts
query CityById{
  worldCity(id: "a4a48716-3aa7-4da2-b7c6-9c3d64b4f3e5") {
    city
    country
    lat
    lng
    adminName
    population
  }
}
```

## Running Edge Functions in GraphQL

Add the following to your `netlify.toml` file:

```
[[edge_functions]]
path = "/.redwood/functions/graphql"
function = "geolocate"
```

Adding this to the `.toml` file means that when a request is made to the `path`, it will invoke the `geolocate` edge function as part of the request.

## Testing Edge Functions

1. Place edge function in `netlify/edge-functions`
2. In `netlify.toml`, your path is to your serverless function. In order to declare that the edge function run for that path, you specify the function name as the `function` value. Be sure to include the deploy path where functions live, like `/.redwood/functions/` or `/.netlify/functions/`

```
[[edge_functions]]
path = "/.redwood/functions/geolocate"
function = "geolocate"
```

Additional documentation on edge functions can be found [here](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/get-started/)
