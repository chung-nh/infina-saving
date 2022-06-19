import { ApolloServer } from "apollo-server-lambda";

import { typeDefs, resolvers } from "gql/server";
const server = new ApolloServer({
  typeDefs,
  resolvers
});

export const graphql = server.createHandler(
  {
    cors: {
      origin: '*',
      methods: 'GET,POST',
      allowedHeaders: [
        'Content-Type',
        'Origin',
        'Accept',
        'Authorization'
      ]
    }
  }
);