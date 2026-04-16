const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const cors = require('cors');
const axios = require('axios');



const posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },
  { id: 6, title: 'Post 6' },
  { id: 7, title: 'Post 7' },
  { id: 8, title: 'Post 8' },
  { id: 9, title: 'Post 9' },
  { id: 10, title: 'Post 10' },
  { id: 11, title: 'Post 11' },
  { id: 12, title: 'Post 12' },
  { id: 13, title: 'Post 13' },
  { id: 14, title: 'Post 14' },
  { id: 15, title: 'Post 15' },
  { id: 16, title: 'Post 16' },
  { id: 17, title: 'Post 17' },
  { id: 18, title: 'Post 18' },
  { id: 19, title: 'Post 19' },
  { id: 20, title: 'Post 20' },
];


// this is the server side code for the GraphQL API. It defines the schema and resolvers for the API, and starts the server on port 5500. The API has three main queries: getTodos, getAllUsers, and getUser. The getTodos query fetches a list of todos from an external API, while the getAllUsers and getUser queries fetch user data from the same external API. The API also includes a resolver for fetching posts with cursor-based pagination. The posts are stored in an in-memory array, and the getPosts query accepts a limit and an optional cursor to fetch a specific page of posts. The response includes the edges (posts) and pageInfo (hasNextPage and endCursor) for pagination.


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
    
    type Post {
    id: ID!
    title: String!}

    type PostEdge {
    node: Post!
    cursor: String!
    }

    type PageInfo {
    hasNextPage: Boolean!
    endCursor: String}

    type PageConnection {
      edges: [PostEdge!]!
      pageInfo: PageInfo!
    }

    type Query {
      getTodos: [Todo!]
      getAllUsers: [User!]
      getUser(id: ID!): User
      getPosts(limit: Int!, after: String): PageConnection!
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
      },
      /// Cursor Pagination Resolver
      getPosts: (_, {limit, after}) => {
        let startIndex = 0;

        if(after){
          const index = posts.findIndex(post => post.id === parseInt(after, 10));
          startIndex = index + 1;
        }

        const slicedPosts = posts.slice(startIndex, startIndex + limit);

        return {
          edges : slicedPosts.map(post => ({
            node: post,
            cursor : post.id.toString()
          })),
          pageInfo : {
            hasNextPage : startIndex + limit < posts.length,
            endCursor : slicedPosts.length > 0 ? slicedPosts[slicedPosts.length - 1].id.toString() : null
          }
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
