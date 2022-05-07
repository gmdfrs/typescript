import { createTokenService, deleteTokenService, getCookie, isBrowser, refreshTokenService, setCookie } from '../../services';
import { ConfigPkce, Token} from '../../types';
import { Base } from '../base';
import {generateCodeChallenge, generateCodeVerifier} from './service';
// import * as crypto from 'crypto';


/**
 * Class for pkce flow 
 */
const resourceName = 'authorization_code_pkce';

export class Pkce extends Base{
    
    protected code: string;
    protected code_verifier:string;
    protected redirectUri:string;
    protected stringCodeVerifier:string;
    protected code_chellenge :string;

    constructor (config:ConfigPkce){
        super();
        this.grant_type = 'authorization_code';
        this.baseUrl = config.baseUrl;
        this.clientId = config.clientId;
        this.redirectUri = config.redirectUri;
        this.scopes = config.scopes ? config.scopes : [];
        this.code_verifier = generateCodeVerifier(); //base64URLEncode(crypto.randomBytes(32));
        this.code_chellenge = generateCodeChallenge(this.code_verifier) // base64URLEncode(sha256(this.code_verifier));
        this.token = {
            access_token:"",
            refresh_token:"",
            id_token:"",
            token_type:"Bearer",
            expires_in:0
          }
        
          
    }

    /**
     * Get a token
     * @returns 
     */
    async getToken():Promise<string> {
        let access_token = "";

        if(isBrowser){
            console.log("[browser (PKCE)] recuperation : le access_token dans cookies");
            let cookies= getCookie("PKCE");
            if(cookies) {
                let tmp = cookies.split('refresh');
                access_token = tmp[1] ? tmp[0] : "";
            }

        }
        else{
            console.log("[node (PKCE)] recuperation : le access_token dans (this.token)");
            throw new Error('Method not implemented.');
        }

        return access_token;
        
    }
    
    /**
     * function to create a token
     * @param headers 
     * @returns 
     */
    async createToken(headers?: any):Promise<Token>{

        if(!this.code) throw new Error('you must first have the code access  width [oauthContext.getCode() and oauthContext.authorizeUser(code:string)]');

        console.log("[browser (CC)] creation : le token");
        
        var requestBody = {
                        grant_type: 'authorization_code',
                        client_id: this.clientId,
                        code: this.code,
                        redirect_uri: this.redirectUri,
                        code_verifier: this.code_verifier,
                      };
     
        let responseService = async function(accessTokenUri: string, requestBody: any, headers: any) {
            let res = await createTokenService(accessTokenUri, requestBody, headers).then(res => { return res })
            let token ={
                access_token:res["access_token"] ? res["access_token"] : "",
                refresh_token:res["refresh_token"] ? res["refresh_token"] : "",
                id_token:"",
                token_type:"Bearer",
                expires_in:res["expires_in"] ? res["expires_in"] : 0,
            }
            return token;
        }
        let newHeaders = headers ? headers : {};
        const token = await responseService(`${this.baseUrl}/o/oauth2/token`, requestBody, Object.assign(newHeaders, {'content-type': 'application/x-www-form-urlencoded'}));

        if (token){
            if(isBrowser){
                console.log("[browser (PKCE)] stockage : le access_token dans cookies");
                setCookie("PKCE",token['access_token']+ "refresh" + token['refresh_token']  ,token['expires_in']);
            }else{
                console.log("[node (PKCE)] stockage : le access_token dans (this.token)");
                throw new Error('Method not implemented.');
                // this.token.access_token = token['access_token'] ? token['access_token'] : "";
                // this.token.expires_in = token['expires_in'] ? token['expires_in'] : 0,
                // this.token.refresh_token = token['refresh_token'] ? token['refresh_token'] : "";
                // this.token.id_token = token['id_token'] ? token['id_token'] : "";
            }
            
        };
        
        return token;

    }

    /**
     * refresh token
     * @returns 
     */
    async refreshToken():Promise<string>{

        var refresh_token = "";
        
        if(isBrowser){
            console.log("[browser && node (PKCE)] refresh Token : refresh - token ")
            let cookies = getCookie("PKCE");
            
            if(cookies) {
                let tmp = cookies.split('refresh');
                refresh_token = tmp[1] ? tmp[1] : "";
            }
        }

        var requestBody = {
            grant_type: 'refresh_token',
            client_id: this.clientId,
            refresh_token: refresh_token,
        };
        
        let responseService = function(accessTokenUri: string, requestBody: any, headers: {}) {
            return refreshTokenService(accessTokenUri, requestBody, headers)
            .then(res => { return res } )
        }

        const token = await responseService(`${this.baseUrl}/o/oauth2/token`, requestBody, {'content-type': 'application/x-www-form-urlencoded'});

        if (token){
            if(isBrowser){
                console.log("[browser (PKCE)] stockage aprés refresh: le access_token dans cookies");
                setCookie("PKCE",token['access_token'] +";" + token['refresh_token'] ,token['expires_in']);
            }else{
                console.log("[Node (PKCE)] stockage aprés refresh: le access_token dans (this.token)");
                throw new Error('Method not implemented.');
                // this.token.access_token = token['access_token'] ? token['access_token'] : "";
                // this.token.expires_in = token['expires_in'] ? token['expires_in'] : 0,
                // this.token.refresh_token = token['refresh_token'] ? token['refresh_token'] : "";
                // this.token.id_token = token['id_token'] ? token['id_token'] : "";
            }
            
        };
        return token["access_token"];
    }

    /**
     * Delete token
     */
    async deleteToken(){

        if(isBrowser){
            console.log("[browser (PKCE)] delete Token : vider les cookies ");
            deleteTokenService();
        }
        else{
            console.log("[node (PKCE)] delete Token : vider le (this.token) ");
            throw new Error('Method not implemented.');
            // this.token.access_token =  "";
            // this.token.expires_in =  0,
            // this.token.refresh_token =  "";
            // this.token.id_token =  "";
        }

        return true;
    }

    /**
     * Insert the access code 
     * @param code 
     */
    authorizeUser(code:string):void{
        this.code = code;
    }

    /**
     * GET the access code
     * @returns 
     */
    getCode(): string{
       return `${this.baseUrl}/o/oauth2/authorize/?client_id=${this.clientId}&response_type=code&code_challenge=${this.code_chellenge}&code_challenge_method=S256&redirect_uri=${this.redirectUri}`;
   } 
}