import { IResolvers } from 'apollo-server';
import DataLoader from 'dataloader';

const resolvers: IResolvers[] = [
  {
    Query: {
      getCharacterById: async (_, { characterId }, { dataSources }) => {
        const character = await dataSources.characterAPI.getCharacter(characterId);
        return {
          ...character,
        };
        // TODO: Modify and move to user Create Mutation
        // const character = await dataSources.userAPI.createUser(characterId);
        // return {
        //   ...character,
        // };
      },
      findCharacters: async (_, { nameStartsWith, limit }, { dataSources }) => {
        return dataSources.characterAPI.getCharacters(nameStartsWith, limit);
      },
    },
  },
  {
    Query: {
      getEventById: async (_, { eventId }, { dataSources }) => {
        const event = await dataSources.eventsAPI.getEvent(eventId);
        return {
          ...event,
        };
      },
    },
    Event: {
      characters(parent, _, { dataSources }) {
        const charIds = parent.characters.map((character: any) => character.id);
        const charLoader = new DataLoader(async keys => {
          return await Promise.all(keys.map(key => dataSources.characterAPI.getCharacter(key)));
        });
        return Promise.all(charIds.map((id: any) => charLoader.load(id)));
      },
    },
  },
];

export default resolvers;
