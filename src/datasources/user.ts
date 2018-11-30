import { DataSource } from 'apollo-datasource';

export default class UserAPI extends DataSource {
  store: any;

  constructor({ store }: { store: any }) {
    super();
    this.store = store;
  }

  createUser = async (response: any) => {
    // TODO: Modify USer Creation
    const res = await this.store.users.addUser(response);
    return res;
  };
}
