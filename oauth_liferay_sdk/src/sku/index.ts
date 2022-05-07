import { Base } from '../base';
import { makeRequest } from '../services';

const resourceName = 'skus';

export class Sku extends Base {

    // get sku by-externalReferenceCode
    async getSkuByExternalReferenceCode(params:{externalReferenceCode:string}, headers?:any) {

        let sku = function (base: any, url: string, method: string, data: any, headers: any) {
            return makeRequest(base, url, method, data, headers)
                .then((response: any) => {
                    return response;
                });
        }
        console.log(`${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${params.externalReferenceCode}`)
        const response = await sku(this, `${this.oauth2context.baseUrl}/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${params.externalReferenceCode}`, 'GET', null, headers);
        return response;
   }
}

