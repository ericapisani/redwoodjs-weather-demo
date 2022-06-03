export const schema = gql`
  type WeatherReport {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    worldCity: WorldCity!
    worldCityId: String!
    headline: String!
    description: String!
    icon: String!
    tempFahrenheit: Int!
    feelsLikeFahrenheit: Int!
    tempMinFahrenheit: Int!
    tempMaxFahrenheit: Int!
    tempCelcius: Int!
    feelsLikeCelcius: Int!
    tempMinCelcius: Int!
    tempMaxCelcius: Int!
    temp: Float!
    feelsLike: Float!
    tempMin: Float!
    tempMax: Float!
    pressure: Int!
    humidity: Int!
    windSpeed: Float!
    windDegrees: Int!
    sunrise: DateTime!
    sunset: DateTime!
  }

  type Query {
    weatherReports: [WeatherReport!]! @skipAuth
    weatherReport(id: String!): WeatherReport @skipAuth
  }

  input CreateWeatherReportInput {
    worldCityId: String!
    headline: String!
    description: String!
    icon: String!
    tempFahrenheit: Int!
    feelsLikeFahrenheit: Int!
    tempMinFahrenheit: Int!
    tempMaxFahrenheit: Int!
    tempCelcius: Int!
    feelsLikeCelcius: Int!
    tempMinCelcius: Int!
    tempMaxCelcius: Int!
    temp: Float!
    feelsLike: Float!
    tempMin: Float!
    tempMax: Float!
    pressure: Int!
    humidity: Int!
    windSpeed: Float!
    windDegrees: Int!
    sunrise: DateTime!
    sunset: DateTime!
  }

  input UpdateWeatherReportInput {
    worldCityId: String
    headline: String
    description: String
    icon: String
    tempFahrenheit: Int
    feelsLikeFahrenheit: Int
    tempMinFahrenheit: Int
    tempMaxFahrenheit: Int
    tempCelcius: Int
    feelsLikeCelcius: Int
    tempMinCelcius: Int
    tempMaxCelcius: Int
    temp: Float
    feelsLike: Float
    tempMin: Float
    tempMax: Float
    pressure: Int
    humidity: Int
    windSpeed: Float
    windDegrees: Int
    sunrise: DateTime
    sunset: DateTime
  }

  type Mutation {
    createWeatherReport(input: CreateWeatherReportInput!): WeatherReport!
      @requireAuth
    updateWeatherReport(
      id: String!
      input: UpdateWeatherReportInput!
    ): WeatherReport! @requireAuth
    deleteWeatherReport(id: String!): WeatherReport! @requireAuth
  }
`
