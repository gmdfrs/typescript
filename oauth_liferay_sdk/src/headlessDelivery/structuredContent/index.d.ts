import { Base } from '../../base';
export declare class StructuredContent extends Base {
    getStructuredContentByContentStructureId(params: {
        contentStructureId: number;
    }, headers?: any): Promise<any>;
    getAllStructuredContentByContentStructureId(params: {
        contentStructureId: number;
    }, headers?: any): Promise<any>;
    getRendredContentByStructuredContentIdAndTemplateId(params: {
        structuredContentId: number;
        templateId: number;
    }, headers?: any): Promise<any>;
}
