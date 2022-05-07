import { Base } from '../base';
import { makeRequest } from '../services';

const resourceName = 'payments';

export class Payment extends Base {

    // get all payments
    private async getPayments(params?:any, headers?: any) {

        let payments = function (base: any, url: string, method: string, data: any, headers: any){
            return   makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await payments(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/payments`,  'GET', null, headers);  
        return response;
        
    }

    // get all payments
    async getAllPayments(params?:any, headers?: any) {

        //1. get first page
        let payments = await this.getPayments(params, headers);

        //2. evaluate if more pages are available for this resource (the field of the response (totalCount) indicate how many results possible).
        if(payments && payments.lastPage !== 'undefined' && payments.lastPage !== null && payments.lastPage > 1){
            let allPayments = function (base: any, url: string, method: string, data: any, headers: any){
                return makeRequest(base, url, method, data, headers)
                .then((response: any)=> { 
                   return response;
                });
            }
            
            const response = await allPayments(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/payments?pageSize=${payments.totalCount}`,  'GET', null, headers);
            return response;  
        }

        return payments;
    }

    // get payment by id
    async getPaymentById(params?:any, headers?: any) {
        let payment = function (base: any, url: string, method: string, data: any, headers: any){
            return   base.makeRequest(url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await payment(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/payments`,  'GET', null, headers);  
        return response;
    }

    // search payment
    async searchPayment(params?:any, headers?: any) {
        let payments = function (base: any, url: string, method: string, data: any, headers: any){
            return   base.makeRequest(url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await payments(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/payments`,  'GET', null, headers);  
        return response;
    }

    // add payment
    async addPayment(data:any, headers?: any ) {
        let payment = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await payment(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/payments`,  'POST', data, headers);  
        return response;
    }

    // update payment
    async updatePayment(data:any, headers?: any ) {
        let payment = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await payment(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/payments`,  'PUT', data, headers);  
        return response;
    }

    // delete payment
    async deletePayment(data:any, headers?: any ) {
        let payment= function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
            .then((response: any)=> { 
                return response;
            });
        }

        const response = await payment(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/payments`,  'DELETE', data, headers);  
        return response;
    }
}