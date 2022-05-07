import { Base } from '../base';
import { makeRequest } from '../services';

const resourceName = 'catalogs';

export class Catalog extends Base {

    // get all catalogs
    private async getCatalogs(params?:any, headers?: any) {

        let catalogs = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await catalogs(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/catalogs`,  'GET', null, headers);  
        return response;
        
    }

    // get all catalogs
    async getAllCatalogs(params?:any, headers?: any) {

        //1. get first page
        let catalogs = await this.getCatalogs(params , headers);

        //2. evaluate if more pages are available for this resource (the field of the response (totalCount) indicate how many results possible).
        if(catalogs && catalogs.lastPage !== 'undefined' && catalogs.lastPage !== null && catalogs.lastPage > 1){
            let allCatalogs = function (base: any, url: string, method: string, data: any, headers: any){
                return makeRequest(base, url, method, data, headers)
                .then((response: any)=> { 
                   return response;
                });
            }
            
            const response = await allCatalogs(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/catalogs?pageSize=${catalogs.totalCount}`,  'GET', null, headers);
            return response;  
        }

        return catalogs;
    }

    // get catalaog by id
    async getCatalogById(params:{id:number}, headers?: any) {
        let catalog = function (base: any, url: string, method: string, data: any, headers: any){
            return   makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await catalog(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/catalog/${params.id}`,  'GET', null, headers);
        return response;
    }

    // search catalog
    async searchCatalog(params?:any, headers?: any) {
        let catalogs = function (base: any, url: string, method: string, data: any, headers: any){
            return   base.makeRequest(url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await catalogs(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products`,  'GET', null, headers);  
        return response;
    }

    // add catalog
    async addCatalog(data:any, headers?: any ) {
        let catalog = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await catalog(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/catalogs`,  'POST', data, headers);  
        return response;
    }

    // update catalog
    async updateCatalog(data:any, headers?: any ) {
        let catalog = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await catalog(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/catalogs`,  'PUT', data, headers);  
        return response;
    }

    // delete catalog
    async deleteCatalog(data:any, headers?: any ) {
        let catalog = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await catalog(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/catalogs`,  'DELETE', data, headers);  
        return response;
    }
}