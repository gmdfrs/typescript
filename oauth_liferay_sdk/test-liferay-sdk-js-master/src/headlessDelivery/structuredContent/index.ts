import { Base } from '../../base';
import { makeRequest } from '../../services';
import { queryParamsStringifier } from '../../utils';

const resourceName = 'structured-content';

export class StructuredContent extends Base {

    // Retrieves a list of the content structure's structured content. Results can be paginated, filtered, searched, and sorted.
    async getStructuredContentByContentStructureId (params:{contentStructureId:number}, headers?: any) {

        let structuredContent  = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
                .then((response: any)=> {
                    return response;
                });
        }

        const response = await structuredContent(this, `${this.oauth2context.baseUrl}/o/headless-delivery/v1.0/content-structures/${params.contentStructureId}/structured-contents`,  'GET', null, headers);
        return response;

    }

    // Retrieves a list of the content structure's structured content. Results can be paginated, filtered, searched, and sorted.
    async getAllStructuredContentByContentStructureId(params:{contentStructureId:number}, headers?: any) {

        //1. get first page
        let structuredContent = await this.getStructuredContentByContentStructureId(params , headers);

        //2. evaluate if more pages are available for this resource (the field of the response (totalCount) indicate how many results possible).
        if(structuredContent && structuredContent.lastPage !== 'undefined' && structuredContent.lastPage !== null && structuredContent.lastPage > 1){
            let allStructuredContent = function (base: any, url: string, method: string, data: any, headers: any){
                return makeRequest(base, url, method, data, headers)
                    .then((response: any)=> {
                        return response;
                    });
            }

            const response = await allStructuredContent(this, `${this.oauth2context.baseUrl}/o/headless-delivery/v1.0/content-structures/${params.contentStructureId}/structured-contents?pageSize=${structuredContent.totalCount}&${queryParamsStringifier(params)}`,  'GET', null, headers);
            return response;
        }

        return structuredContent;
    }

    // Retrieves the structured content's rendered template (the result of applying the structure's values to a template).
    async getRendredContentByStructuredContentIdAndTemplateId (params:{structuredContentId:number, templateId:number}, headers?: any) {

        let rendredContent  = function (base: any, url: string, method: string, data: any, headers: any){
            return makeRequest(base, url, method, data, headers)
                .then((response: any)=> {
                    return response;
                });
        }

        const response = await rendredContent(this, `${this.oauth2context.baseUrl}/o/headless-delivery/v1.0/structured-contents/${params.structuredContentId}/rendered-content/${params.templateId}`,  'GET', null, headers);
        return response;

    }

}