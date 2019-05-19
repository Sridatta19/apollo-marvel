import { IResolvers, IFieldResolver } from 'apollo-server';
import DataLoader from 'dataloader';
import { fillEntities } from './utils/util';

const findEntityById = (entityType: string): IFieldResolver<any, any, { [name: string]: any }> => {
  return async (_: any, { id }: { [name: string]: any }, { dataSources }: { dataSources: any }): Promise<any> => {
    const response = await dataSources.entityAPI.getEntity(id, entityType);
    const populateFn: Function = fillEntities[entityType];
    const entity = populateFn(response);
    return {
      ...entity,
    };
  };
};

const findAllEntities = (entityType: string): IFieldResolver<any, any, { [name: string]: any }> => {
  return async (
    _: any,
    { nameStartsWith, limit }: { [name: string]: any },
    { dataSources }: { dataSources: any }
  ): Promise<any> => {
    const response = await dataSources.entityAPI.getEntities(entityType, nameStartsWith, limit);
    const populateFn: Function = fillEntities[entityType];
    return response.map((entity: any) => populateFn([entity]));
  };
};

const resolvers: IResolvers[] = [
  {
    Query: {
      findCharacterById: findEntityById('characters'),
      findCreatorById: findEntityById('creators'),
      findEventById: findEntityById('events'),
      findComicById: findEntityById('comics'),
      findSeriesById: findEntityById('series'),
      findStoryById: findEntityById('stories'),
      findCharacters: findAllEntities('characters'),
      findCreators: findAllEntities('creators'),
      findEvents: findAllEntities('events'),
      findComics: findAllEntities('comics'),
      findSeries: findAllEntities('series'),
      findStories: findAllEntities('stories'),
    },
  },
  {
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
