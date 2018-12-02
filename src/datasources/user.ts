import { DataSource } from 'apollo-datasource';
import { genSaltSync, hashSync } from 'bcryptjs';

export default class UserAPI extends DataSource {
  store: any;

  constructor({ store }: { store: any }) {
    super();
    this.store = store;
  }

  createUser = async ({ email, password }: { email: string; password: string }) => {
    // TODO: Modify USer Creation
    const { count } = await this.store.users.searchUsers({ email });
    if (count) {
      throw new Error('User with email already exists');
    }
    const user: { [key: string]: any } = { email };
    user.salt = genSaltSync(10);
    user.digest = hashSync(password, user.salt);
    const res = await this.store.users.addUser(user);
    return res;
  };
}
