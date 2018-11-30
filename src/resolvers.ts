import { IResolvers } from 'apollo-server';

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
  },
];

export default resolvers;
