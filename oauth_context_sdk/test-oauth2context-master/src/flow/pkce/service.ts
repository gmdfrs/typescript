import axios from "axios";
import * as querystring from 'querystring';
import { isBrowser, isJsDom } from "../../services";
// import * as crypto from 'crypto';
// import sha256 from 'crypto-js/sha256';
import sha256 from "fast-sha256";


export async function redirectService(baseUrl:string, requestBody:any): Promise<unknown>{
    
    if(isBrowser){
        const headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*", 
            "Access-Control-Allow-Headers": "*", 
            "Content-type": "Application/json",
    }
        try {    
            console.log("code_challenge", requestBody.code_challenge);
            console.log("code_challenge url", `${baseUrl}/o/oauth2/authorize/?client_id=${requestBody.client_id}&response_type=code&code_challenge=${requestBody.code_challenge}&code_challenge_method=${requestBody.code_challenge_method}&redirect_uri=${requestBody.redirect_uri}`);       
            const response = await fetch(`${baseUrl}/o/oauth2/authorize/?client_id=${requestBody.client_id}&response_type=code&code_challenge=${requestBody.code_challenge}&code_challenge_method=${requestBody.code_challenge_method}&redirect_uri=${requestBody.redirect_uri}`, {headers});
            
           // window.location.replace(response.url);
            var xhr = new XMLHttpRequest();
                xhr.open('GET', response.url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                       // alert('User\'s name is ' + xhr.);
                       console.log("xhr", xhr)
                    }
                    else {
                        alert('Request failed.  Returned status of ' + xhr.status);
                    }
                };
                xhr.send();
            return response;

        } catch (error) {
            console.log("Error ", error);
            return error.response;
        }
        
    }
    else return null;
    //http://localhost:8080/o/oauth2/authorize/?client_id=id-8412e79b-cae7-1c49-c85a-da6c80b541d1&response_type=code&code_challenge=XbMKDe93PMlcdy1sAmsf-bjo9Uo32ERqDBrcgtcMF48&code_challenge_method=S256&redirect_uri=https://oauth.pstmn.io/v1/callback
 }

// Create code verifier
// Dependency: Node.js crypto module
// https://nodejs.org/api/crypto.html#crypto_crypto
// export function base64URLEncode(str) {
//     return str.toString('base64')
//         .replace(/\+/g, '-')
//         .replace(/\//g, '_')
//         .replace(/=/g, '');
// }

// Create code challenge
// Dependency: Node.js crypto module
// https://nodejs.org/api/crypto.html#crypto_crypto
// export function sha256(buffer) {
//    return crypto.createHash('sha256')
//           .update(buffer)
//           .digest();
// }

export function generateCodeVerifier() {
    let code_verifier = generateRandomString(128);
    return code_verifier;
}

function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export function generateCodeChallenge(code_verifier) {
    let code_challenge = base64URL(sha256(code_verifier))
    return code_challenge;
}

function base64URL(str) {
    return str.toString('base64')
         .replace(/\+/g, '-')
         .replace(/\//g, '_')
         .replace(/=/g, '');
}
//https://gist.github.com/tonyxu-io/21eb57ab2a4aeb2a3ee10f77542abe64