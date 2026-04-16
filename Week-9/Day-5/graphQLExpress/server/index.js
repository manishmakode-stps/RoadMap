const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const cors = require('cors');
const axios = require('axios');

async function startServer() {
  const typeDefs = `
  type User {
      id: ID!
      name: String!
      username: String!
      email: String!
      phone: String!
      website: String!
    }
    type Todo {
      id: ID!
      title: String!
      completed: Boolean!
      user: User
    }

    type Query {
      getTodos: [Todo!]
      getAllUsers: [User!]
      getUser(id: ID!): User
    }
  `;

  const resolvers = {
    Todo: {
        user : async (todo) => (
            await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)
        ).data
    },
    Query: {
      getTodos: async () => {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {timeout: 5000});
          return response.data;
        } catch (error) {
          console.error('Error fetching todos:', error);
          return [];
        }
      },
      getAllUsers: async () => {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          return response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
          return [];
        }
      },
      getUser: async (parent,{id}) => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
          return null;
        }
      }
    },
  };

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();

  app.use('/graphql', cors(), express.json(), expressMiddleware(server));

  app.listen(5500, () => {
    console.log('Server is running on http://localhost:5500/graphql');
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
