export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Product {
    id: ID!
    title: String!
    price: Float!
    category: String!
    author: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    me: User
    products: [Product!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createProduct(title: String!, price: Float!, category: String!): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;
