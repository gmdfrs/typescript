import { Base } from '../base';
import { makeRequest } from '../services';


const resourceName = 'orders';
// ${ORDER_API_URL}/${id}
export class Order extends Base {
    
    // get all orders
    private async getOrders(params?:any, headers?: any) {

        let orders = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
            return response;
            });
        }

        const response = await orders(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/orders`,  'GET', null, headers);  
        return response;
        
    }

    // get all orders
    async getAllOrders(params?:any, headers?: any) {

        //1. get first page
        let orders = await this.getOrders(params, headers);

        //2. evaluate if more pages are available for this resource (the field of the response (totalCount) indicate how many results possible).
        if(orders && orders.lastPage !== 'undefined' && orders.lastPage !== null && orders.lastPage > 1){
            let allOrders = function (base: any, url: string, method: string, data: any, headers: any){
                return makeRequest(base, url, method, data, headers)
                .then((response: any)=> { 
                   return response;
                });
            }
            
            const response = await allOrders(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/orders?pageSize=${orders.totalCount}`,  'GET', null, headers);
            return response;  
        }

        return orders;
    }

    // get order by id
    async getOrderById(params?:any, headers?: any) {
        let order = function (base: any, url: string, method: string, data: any, headers: any){
            return   makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
            return response;
            });
        }

        const response = await order(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/orders`,  'GET', null, headers);  
        return response;
    }

    // search order
    async searchOrder(params?:any, headers?: any) {
        let orders = function (base: any, url: string, method: string, data: any, headers: any){
            return   base.makeRequest(url, method, data, headers)
            .then((response: any)=> { 
            return response;
            });
        }

        const response = await orders(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/orders`,  'GET', null, headers);  
        return response;
    }

    // add order
    async addOrder(data:any, headers?: any ) {
        let order = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await order(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/orders`,  'POST', data, headers);  
        return response;
    }

    // update catalog
    async updateOrder(data:any, headers?: any ) {
        let order = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await order(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/orders`,  'PUT', data, headers);  
        return response;
    }

    // delete catalog
    async deleteOrder(data:any, headers?: any ) {
        let order = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await order(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/orders`,  'DELETE', data, headers);  
        return response;
    }
}
