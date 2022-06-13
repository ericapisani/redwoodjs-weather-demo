export const schema = gql`
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

  type Query {
    searchWorldCities(search: SearchWorldCityInput): [WorldCity!]! @skipAuth
    nearbyWorldCities: [WorldCity!]! @skipAuth
    worldCityWeatherReport(worldCityId: String!): WeatherReport! @skipAuth
  }
`
