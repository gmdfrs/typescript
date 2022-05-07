import { Base } from '../base';
import { ConfigClientCredentials, Token } from '../../types';
import { createTokenService, deleteTokenService, getCookie, isBrowser, setCookie } from '../../services';


/**
 * Class for client credentials flow 
 */

const resourceName = 'client_credentials';

export class ClientCredentials extends Base{ 
    
    private clientSecret: string;

    constructor (config:ConfigClientCredentials){
        super();
        this.grant_type = 'client_credentials';
        this.baseUrl = config.baseUrl;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.scopes = config.scopes ? config.scopes : [];  
        this.token = {
            access_token:"",
            refresh_token:"",
            id_token:"",
            token_type:"Bearer",
            expires_in:0
          }  

    }

    /**
     * function to create a token
     * @param headers 
     * @returns 
     */
    async createToken(headers?: any): Promise<Token>{
        console.log("[browser && Node (CC)] creation : le token");
        const requestBody = {
            grant_type: this.grant_type,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            scope: this.scopes
        };

        let responseService = async function(accessTokenUri: string, requestBody: any, headers:any):Promise<Token> {
            let res = await createTokenService(accessTokenUri, requestBody, headers);
            let token ={
                access_token:res["access_token"] ? res["access_token"] : "",
                refresh_token:res["refresh_token"] ? res["refresh_token"] : "",
                id_token:"",
                token_type:"Bearer",
                expires_in:res["expires_in"] ? res["expires_in"] : 0,
            }
            return token;
        }

        const token  = await responseService(`${this.baseUrl}/o/oauth2/token`, requestBody, headers);

        if (token){
            // if browoser
            if(isBrowser){
                console.log("[browser (CC)] stockage : le access_token dans cookies");
                // creation of cookies
                setCookie("CLIENT_CREDENTIALS",token['access_token'] ,token['expires_in'])
            }// if node
            else{
                console.log("[node (CC)] stockage : le access_token dans (this.token)");

                this.token.access_token = token['access_token'] ? token['access_token'] : "";
                this.token.expires_in = token['expires_in'] ? token['expires_in'] : 0,
                this.token.id_token = token['id_token'] ? token['id_token'] : "";
            }
        };
        
        return token;
    }

    /**
     * Get a token
     * @returns
     */
    async getToken(): Promise<string>{
        let access_token = "";

        if(isBrowser){
            console.log("[browser (CC)] recuperation : le access_token dans cookies");
            access_token = getCookie("CLIENT_CREDENTIALS");
        }
        else{
            console.log("[node (CC)] recuperation : le access_token dans (this.token)");
            access_token = this.token.access_token;
        }

        return access_token;
    }

    /**
     * refresh token
     * @returns 
     */
    async refreshToken():Promise<string>{
        console.log("[browser && node (CC)] refresh Token : c-a-dire recreeation de token ")
        let newToken = await this.createToken({}).then((res)=>{return res;}); 
        if (newToken["access_token"]) return newToken["access_token"];
    }

    /**
     * Delete token
     */
    async deleteToken(): Promise<any>{

        if(isBrowser){
            console.log("[browser (CC)] delete Token : vider les cookies ");
            deleteTokenService();
        }
        else{
            console.log("[node (CC)] delete Token : vider le (this.token) ");
            this.token.access_token =  "";
            this.token.expires_in =  0,
            this.token.refresh_token =  "";
            this.token.id_token =  "";
        }

        return true;
    }    
}
