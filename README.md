# README


Run with `netlify dev` locally instead of `yarn rw dev` to test Netlify Edge Functions.

Note: If editing code while running `netlify dev`, the api server will try to restart but may get warning that port is in use. You will need to stop and restart `netlify dev` manually.
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

### Database Setup

It's recommended to use [`Postgres`] for your database so the schema can use `BigInt` and `Float` nicely.

Also, the seed script uses Prisma's [`createMany()`](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany) to bulk load records in batches which is significantly faster that loading data row by row -- which is important because we have ~43,000 world cities in the dataset.

Unfortunately, `createMany` is not supported by SQLite.

The easiest way to get Postgres up ad running locally on OSX is [Postres.app](https://postgresapp.com).

You can then set you database configuration settings to two different local databases, like:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/redwoodjs-weather-demo-test
TEST_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/redwoodjs-weather-demo-test
```

#### Setting up a Database on Railway


If you'd rather not worry about setting up a Postgres database on your computer, you can easily provision a Postgres database on [Railway for free](https://railway.app/)(for 24 hours).

After provisioning a database on Railway, copy the 'database connection URL' that Railway provides. You can then use this as your `DATABASE_URL` value in your local environment.

To apply the Prisma schema to the provisioned databse, run `yarn rw prisma db push`.

To run the seed script that populates the provisioned database, run `yarn rw prisma db seed`.

## GraphQL Queries

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

```
[[edge_functions]]
path = "/.redwood/functions/graphql"
function = "geolocate"
```


## Testing Edge functions


1. Place edge function in `netlify/edge-functions`
2. In `netlify.toml` your path is to your serverless function and then declare the edge function to run for that path. Be sure to include the deploy path where functions live, like `/.redwood/functions/` or `/.netlify/functions/`

```
[[edge_functions]]
path = "/.redwood/functions/geolocate"
function = "geolocate"
```


---
# README

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)
