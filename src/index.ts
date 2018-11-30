import dotenv from 'dotenv';

import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import schema from './schema';

import CharacterAPI from './datasources/character';
import EventsAPI from './datasources/event';
import UserAPI from './datasources/user';

import store from './elasticsearch';

dotenv.config({ path: 'variables.env' });

const dataSources = () => ({
  characterAPI: new CharacterAPI(),
  eventsAPI: new EventsAPI(),
  userAPI: new UserAPI({ store }),
});

const server = new ApolloServer({
  typeDefs: schema,
  // @ts-ignore: resolvers should accept Array of Resolvers
  resolvers,
  dataSources,
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
