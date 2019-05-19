import BaseAPI from './base';

export default class EntityAPI extends BaseAPI {
  async getEntity(id: number, uriName: string): Promise<any> {
    const res = await this.getJSON(`${uriName}/${id}`);
    const {
      data: {
        data: { results },
      },
    } = res;
    return results;
  }

  async getEntities(uriName: string, nameStartsWith: string, limit: number = 10): Promise<any> {
    try {
      const res = await this.getJSON(uriName, {
        nameStartsWith,
        limit,
      });
      const {
        data: {
          data: { results },
        },
      } = res;
      return results;
    } catch (err) {
      console.log(err);
    }
  }
}
