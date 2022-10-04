const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
const { finished } = require('stream/promises');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { importSchema} = require("graphql-import");
const { buildSchema } = require("graphql");
const resolvers = require("./api/resolvers");

const typeDefs = importSchema("./api/schema.graphql");
const PORT = process.env.PORT || 4000

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

//   await new Promise(r => app.listen({ port: PORT }, r));
app.listen({ port: PORT })

  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();