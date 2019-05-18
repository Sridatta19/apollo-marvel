import dotenv from 'dotenv';

import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import schema from './schema';

import CharacterAPI from './datasources/character';
import EventsAPI from './datasources/event';
import UserAPI from './datasources/user';

import createStore from './elasticsearch';

dotenv.config({ path: 'variables.env' });

const store = createStore();

const dataSources = (): any => ({
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
