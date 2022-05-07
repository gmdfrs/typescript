import { Base } from '../base';
import { makeRequest } from '../services';
import { queryParamsStringifier } from '../utils';
import { SearchProductParams } from './types';

const resourceName = 'products';

export class Product extends Base {

    // get products
    private async getProducts(params?:SearchProductParams, headers?: any) {

        // console.log("je suis get products", queryParamsStringifier(params))
        // response code 200 = all results, code 206 = single page in multi pages results
        let products = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await products(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products/${ queryParamsStringifier(params) }`,  'GET', null, headers);  
        return response;
        
    }

    // get all products
    async getAllProducts(params?:SearchProductParams, headers?: any) {

        //1. get first page
        let products = await this.getProducts(params, headers);

        //2. evaluate if more pages are available for this resource (the field of the response (totalCount) indicate how many results possible).
        if(products && products.lastPage !== 'undefined' && products.lastPage !== null && products.lastPage > 1){
            let allProducts = function (base: any, url: string, method: string, data: any, headers: any){
                return makeRequest(base, url, method, data, headers)
                .then((response: any)=> { 
                   return response;
                });
            }
           //  console.log(`${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products?pageSize=${products.totalCount}/${ queryParamsStringifier(params) }`)
            console.log(`${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products?pageSize=${products.totalCount}`)
            const response = await allProducts(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products?pageSize=${products.totalCount}`,  'GET', null, headers);
            console.log("response.lastPage", response.lastPage  )
            return response;
        }

        return products;
    }

    // get product by id
    async getProductById(params:{id:number}, headers?: any) {

        let product = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await product(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products/${params.id}`,  'GET', null, headers);  
        return response;
    }

    // search product
    async searchProducts(params?:any, headers?: any) {
        let products = function (base: any, url: string, method: string, data: any, headers: any){
            return   base.makeRequest(url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await products(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products/${ queryParamsStringifier(params) }`,  'GET', null, headers);  
        return response;
    }

    // add product
    async addProduct(data:any, headers?: any ) {
        let product = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await product(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products`,  'POST', data, headers);  
        return response;
    }

    // update product
    async updateProduct(data:any, headers?: any ) {
        let product = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await product(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products`,  'PUT', data, headers);  
        return response;
    }

    // delete product
    async deleteProduct(data:any, headers?: any ) {
        let product = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
               return response;
            });
        }

        const response = await product(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products`,  'DELETE', data, headers);  
        return response;
    }

    // Related Product
    async relatedProduct(params:{id:number}, headers?: any ) {
        let products = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
                .then((response: any)=> {
                    return response;
                });
        }

        const response = await products(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/products/${params.id}/relatedProducts`,  'GET', null, headers);
        return response;
    }

    // get all products
    async getAllProductsByChannels(params:{channelId:number}, headers?: any) {

       let allProducts = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
                .then((response: any)=> {
                    return response;
                });
        }
        const response = await allProducts(this, `${this.oauth2context.baseUrl}/o/headless-commerce-delivery-catalog/v1.0/channels/${params.channelId}/products?pageSize=49 }`,  'GET', null, headers);
        return response;
    }
}

