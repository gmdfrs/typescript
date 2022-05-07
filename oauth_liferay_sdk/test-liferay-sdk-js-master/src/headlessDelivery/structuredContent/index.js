"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructuredContent = void 0;
var base_1 = require("../../base");
var services_1 = require("../../services");
var utils_1 = require("../../utils");
var resourceName = 'structured-content';
var StructuredContent = /** @class */ (function (_super) {
    __extends(StructuredContent, _super);
    function StructuredContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Retrieves a list of the content structure's structured content. Results can be paginated, filtered, searched, and sorted.
    StructuredContent.prototype.getStructuredContentByContentStructureId = function (params, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var structuredContent, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        structuredContent = function (base, url, method, data, headers) {
                            return services_1.makeRequest(base, url, method, data, headers)
                                .then(function (response) {
                                return response;
                            });
                        };
                        return [4 /*yield*/, structuredContent(this, this.oauth2context.baseUrl + "/o/headless-delivery/v1.0/content-structures/" + params.contentStructureId + "/structured-contents", 'GET', null, headers)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // Retrieves a list of the content structure's structured content. Results can be paginated, filtered, searched, and sorted.
    StructuredContent.prototype.getAllStructuredContentByContentStructureId = function (params, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var structuredContent, allStructuredContent, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStructuredContentByContentStructureId(params, headers)];
                    case 1:
                        structuredContent = _a.sent();
                        if (!(structuredContent && structuredContent.lastPage !== 'undefined' && structuredContent.lastPage !== null && structuredContent.lastPage > 1)) return [3 /*break*/, 3];
                        allStructuredContent = function (base, url, method, data, headers) {
                            return services_1.makeRequest(base, url, method, data, headers)
                                .then(function (response) {
                                return response;
                            });
                        };
                        return [4 /*yield*/, allStructuredContent(this, this.oauth2context.baseUrl + "/o/headless-delivery/v1.0/content-structures/" + params.contentStructureId + "/structured-contents?pageSize=" + structuredContent.totalCount + "&" + utils_1.queryParamsStringifier(params), 'GET', null, headers)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3: return [2 /*return*/, structuredContent];
                }
            });
        });
    };
    // Retrieves the structured content's rendered template (the result of applying the structure's values to a template).
    StructuredContent.prototype.getRendredContentByStructuredContentIdAndTemplateId = function (params, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var rendredContent, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rendredContent = function (base, url, method, data, headers) {
                            return services_1.makeRequest(base, url, method, data, headers)
                                .then(function (response) {
                                return response;
                            });
                        };
                        return [4 /*yield*/, rendredContent(this, this.oauth2context.baseUrl + "/o/headless-delivery/v1.0/structured-contents/" + params.structuredContentId + "/rendered-content/" + params.templateId, 'GET', null, headers)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return StructuredContent;
}(base_1.Base));
exports.StructuredContent = StructuredContent;
