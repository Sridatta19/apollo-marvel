import elasticsearch from 'elasticsearch';
import { MARVEL_INDEX, USER_DOC_TYPE } from './utils/constants';

const createStore = (): any => {
  const client = new elasticsearch.Client({
    host: `${process.env.ELASTIC_SEARCH_PROTOCOL}://${process.env.ELASTIC_SEARCH_HOST}:${
      process.env.ELASTIC_SEARCH_PORT
    }`,
  });

  const users = {
    addUser: async (body: any) =>
      client.index({
        index: MARVEL_INDEX,
        type: USER_DOC_TYPE,
        body,
      }),
    searchUsers: async (match: any) =>
      client.count({
        index: MARVEL_INDEX,
        type: USER_DOC_TYPE,
        body: {
          query: {
            match,
          },
        },
      }),
  };

  return {
    users,
  };
};

export default createStore;
