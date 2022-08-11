export const schema = gql`
  type Country {
    country: String!
    iso2: String!
    iso3: String!
  }

  type Query {
    countries: [Country!]! @skipAuth
  }
`
