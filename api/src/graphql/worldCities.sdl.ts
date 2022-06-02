export const schema = gql`
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

  type Query {
    searchWorldCities(search: SearchWorldCityInput): [WorldCity!]! @skipAuth
    worldCities: [WorldCity!]! @skipAuth
    worldCity(id: String!): WorldCity @skipAuth
  }

  input CreateWorldCityInput {
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

  input UpdateWorldCityInput {
    simpleMapsId: BigInt
    city: String
    cityAscii: String
    lat: Float
    lng: Float
    country: String
    iso2: String
    iso3: String
    adminName: String
    capital: String
    population: Int
  }

  input SearchWorldCityInput {
    simpleMapsId: BigInt
    city: String
    cityAscii: String
    lat: Float
    lng: Float
    country: String
    iso2: String
    iso3: String
    adminName: String
    capital: String
    population: Int
  }

  type Mutation {
    createWorldCity(input: CreateWorldCityInput!): WorldCity! @requireAuth
    updateWorldCity(id: String!, input: UpdateWorldCityInput!): WorldCity!
      @requireAuth
    deleteWorldCity(id: String!): WorldCity! @requireAuth
  }
`
