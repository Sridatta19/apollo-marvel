import { RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';
import md5 from 'md5';

export default class BaseAPI extends RESTDataSource {
  // requestConfig: AxiosRequestConfig;

  constructor() {
    super();
    this.baseURL = process.env.BASE_API_URL;
    // const proxyConfig: AxiosProxyConfig = {
    //   port: Number(process.env.PROXY_PORT),
    //   host: process.env.PROXY_HOST as string,
    // };
    // this.requestConfig = {
    //   // proxy: proxyConfig,
    // };
  }

  queryString = (): string => {
    const ts = Date.now();
    const hash = md5(`${ts}${process.env.PRIVATE_KEY}${process.env.API_KEY}`);
    return `ts=${ts}&hash=${hash}&apikey=${process.env.API_KEY}`;
  };

  getJSON = (path: string, initparams: any = {}): any => {
    return axios.get(`${this.baseURL}${path}?${this.queryString()}`, {
      ...initparams,
    });
  };
}
