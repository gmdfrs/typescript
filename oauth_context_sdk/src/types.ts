export type ConfigClientCredentials = {
  baseUrl:string;
  clientId: string;
  clientSecret: string;
  scopes?: string[];
}

export type ConfigPkce = {
  baseUrl:string;
  clientId: string;
  redirectUri: string;
  scopes?: string[];
}
  
export type Token = {
  access_token:string,
  refresh_token?:string,
  id_token?:string,
  token_type:string,
  expires_in:number
}