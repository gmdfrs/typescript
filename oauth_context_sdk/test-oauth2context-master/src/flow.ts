import { ClientCredentials } from './flow/clientCredentials';
import { Pkce } from './flow/pkce';
import { ConfigClientCredentials, ConfigPkce } from './types';

export abstract class Flow {

  static clientCredentials(config:ConfigClientCredentials){
      return new ClientCredentials(config);
  }
  static pkce(config:ConfigPkce){
      return new Pkce(config)
  }
}

