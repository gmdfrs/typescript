import { Config } from './types';

export abstract class Base {
    
    protected oauth2context: any;

    constructor(config:Config) {
        this.oauth2context = config.oauth2context;
    }

    /**
     * return oauth2context
     */
    getOauth2context(){
        return this.oauth2context;
    }
}
