import { Base } from '../base';
import { makeRequest } from '../services';

const resourceName = 'skus';

export class Cart extends Base {

    // get cart
    async getCart(params:{id:number}, headers?:any) {

        let cart = function (base: any, url: string, method: string, data: any, headers: any) {
            return makeRequest(base, url, method, data, headers)
                .then((response: any) => {
                    return response;
                });
        }

        const response = await cart(this, `${this.oauth2context.baseUrl}/o/headless-commerce-delivery-cart/v1.0/carts/${params.id}`, 'GET', null, headers);
        return response;
    }

    // empty cart
    async emptyCart(params:{id:number}, headers?:any) {

        let emptycart = function (base: any, url: string, method: string, data: any, headers: any) {
            return makeRequest(base, url, method, data, headers)
                .then((response: any) => {
                    return response;
                });
        }

        const response = await emptycart(this, `${this.oauth2context.baseUrl}/o/headless-commerce-delivery-cart/v1.0/carts/${params.id}`, 'DELETE', null, headers);
        return response;
    }

    // add new items to cart
    async addNewItemsToCart(params:{id:number}, data:any, headers?:any) {

        let itemCart = function (base: any, url: string, method: string, data: any, headers: any) {
            return makeRequest(base, url, method, data, headers)
                .then((response: any) => {
                    return response;
                });
        }

        const response = await itemCart(this, `${this.oauth2context.baseUrl}/o/headless-commerce-delivery-cart/v1.0/carts/${params.id}/items`, 'POST', data, headers);
        return response;
    }

    // getCartItems
    async getCartItems(params:{id:number}, headers?:any) {

        let itemsCart = function (base: any, url: string, method: string, data: any, headers: any) {
            return makeRequest(base, url, method, data, headers)
                .then((response: any) => {
                    return response;
                });
        }

        const response = await itemsCart(this, `${this.oauth2context.baseUrl}/o/headless-commerce-delivery-cart/v1.0/carts/${params.id}/items`, 'GET', null, headers);
        return response;
    }

    // delete item
    async deleteItem(params:{id:number}, headers?:any) {

        let deleteitem = function (base: any, url: string, method: string, data: any, headers: any) {
            return makeRequest(base, url, method, data, headers)
                .then((response: any) => {
                    return response;
                });
        }

        const response = await deleteitem(this, `${this.oauth2context.baseUrl}/o/headless-commerce-delivery-cart/v1.0/cart-items/${params.id}`, 'DELETE', null, headers);
        return response;
    }
}