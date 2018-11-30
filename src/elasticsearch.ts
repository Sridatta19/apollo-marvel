import elasticsearch from 'elasticsearch';

// const host = `${process.env.ELASTIC_SEARCH_PROTOCOL}://${process.env.ELASTIC_SEARCH_HOST}:${process.env.ELASTIC_SEARCH_PORT}`
const host = 'http://localhost:9200';
const indexName = 'marvel';
const docType = 'user';

const client = new elasticsearch.Client({
  host,
});

const store = {
  addUser: async (body: any) =>
    client.index({
      index: indexName,
      type: docType,
      body,
    }),
};

export default store;
