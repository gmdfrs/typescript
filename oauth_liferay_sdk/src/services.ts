import axios from 'axios';
import qs = require('querystring');

/**
 * recover the token if it exists otherwise it will recreate it
 * @param context 
 * @returns 
 */
async function getTokenAccess(context:any){
        
    let tokenAccess = async()=>{
        let res = await context.oauth2context.getToken().then((res)=> {return res;});          
        return res;
    }

    let toAccess = await tokenAccess().then((res)=>{return res;});

    if(!toAccess){

        var token = async()=>{
          let res = await context.oauth2context.createToken().then((res)=> {return res;});  
          if(res["access_token"]) return res["access_token"];
        }

        let access_token = await token().then((res)=>{return res;});
        return access_token;
       
    }else{
        return toAccess;
    }
}

/**
 * Fonction permettant d'exécuter une requête HTTP avec Axios
 * @param context 
 * @param url 
 * @param method 
 * @param data 
 * @param newHeaders 
 * @returns 
 */
export async function makeRequest(context:any, url: string, method: any, data = null, newHeaders: any){
    
    let accessToken = async ()=>{
        let response = await getTokenAccess(context).then((res)=>{return res});
        return response;
    }

    let access_token = await accessToken().then((res)=>{return res;});
    console.log("accessToken", access_token);
    const headers = {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    };

    const configT = {
        method: method,
        url: url,
        data: data,
        headers: Object.assign(headers, newHeaders),
    }         
    try {
        const response = await axios(configT).then((res)=>{return res});
        return response.data;
    } catch (error) {
        // Error handling function
        return handleError(error, context, url, method, data, newHeaders);
    }    
}

/**
 *  Error handling function
 * @param error 
 * @param context 
 * @param url 
 * @param method 
 * @param data 
 * @param newHeaders 
 * @returns 
 */
async function handleError(error: any, context:any, url: string, method: any, data = null, newHeaders: any){
    if (error.response) {
        // Error 401 && 403
        if ((error.response.status === 401) || (error.response.status === 403)){
            
            console.log("error.response.status",error.response.status + " faire un refresh token");

            let refreshToken = async()=>{
                let res = await context.oauth2context.refreshToken().then((res)=> {return res;});         
                return res;
            }
        
            let newToken = await refreshToken().then((res)=>{return res;});

            console.log("newAccessToken", newToken);
            const headers = {
                                'Authorization': `Bearer ${newToken}`,
                                'Content-type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                            };

            const configT = {
                method: method,
                url: url,
                data: data,
                headers: Object.assign(headers, newHeaders),
            }
             
            try {
                const response = await axios(configT).then((res)=>{return res});
                return response.data;
            }catch (error) {
                // Error handling function
                return {status: error.response.status,
                        message:error.response.data.message
                       };
            } 
        } // Other errors
        else {
            return {status: error.response.status};
        }
    } else if (error.request){
        // No response from server
        return {status: error.request.status};
    } else {
        return error;
    }
}

/**
 * global window self
 */

const isBrowser = typeof window !== 'undefined' 
  && typeof window.document !== 'undefined';

const isNode = typeof process !== 'undefined'
  && process.versions != null
  && process.versions.node != null;

export {
  isBrowser, isNode
};


