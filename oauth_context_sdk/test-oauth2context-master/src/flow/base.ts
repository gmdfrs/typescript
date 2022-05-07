import { Token } from "../types";

/**
 *  Base class for the different flows
 */
export abstract class Base{
    
    protected baseUrl:string;
    protected grant_type: string;
    protected clientId: string;
    protected scopes?: string[];
    protected token:Token;

    constructor(){}
    /**
     * createToken
     * @param headers 
     */
    abstract createToken(headers?: any): Promise<Token>;

    /**
     * Get token
     */
    abstract getToken():Promise<string>;

    /**
     * refresh token
     * @param headers 
     */
    abstract refreshToken(headers?:any):Promise<string>;

    /**
     * Delete token
     */
    abstract deleteToken(): any;
}