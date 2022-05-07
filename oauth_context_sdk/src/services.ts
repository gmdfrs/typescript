import axios, { AxiosPromise } from 'axios';
import querystring = require('querystring');


/**
 * Function to execute an HTTP request with Axios for create token
 * @param accessTokenUri API URL
 * @param headers The headers
 * @param data The body of the message to send
 * @returns {Promise<unknown>} HTTP response
 */
export async function createTokenService(accessTokenUri:any, data:any, headers:any): Promise<unknown>{ 
   try {
        const response = await axios.post(accessTokenUri, querystring.stringify(data), headers)
                               .then(res => {return res})
        
        return response.data;
    } catch (error) {
        console.log("Error ", error.response);
        return error.response;
    }
}

/**
 * Function to execute an HTTP request with Axios for refresh token
 * @param accessTokenUri API URL
 * @param headers The headers
 * @param data The body of the message to send
 * @returns {Promise<unknown>} HTTP response
 */
export async function refreshTokenService(accessTokenUri:any, data:any, headers:any): Promise<unknown>{ 
    try {
        const response = await axios.post(accessTokenUri, querystring.stringify(data), headers)
                               .then(res => {return res})
        
        return response.data;
    } catch (error) {
        console.log("Error ", error.response);
        return error.response;
    }
}

export async function deleteTokenService(){

  if(isBrowser){
    return deleteAllCookies();
  }else return null;

}

// 
export function setCookie(cname, cvalue, exSeconds) {
  var d = new Date();
  d.setTime(d.getTime() +  (exSeconds * 1000 * 60 * 60)); // (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";Secure";  // + ";HttpOnly"
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

// export function checkCookie(username:string) {
//   var user = getCookie(username);
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//     user = prompt("Please enter your name:", "");
//     if (user != "" && user != null) {
//       setCookie("username", user, 365);
//     }
//   }
// }

// https://www.w3schools.com/js/js_cookies.asp#:~:text=Create%20a%20Cookie%20with%20JavaScript&text=With%20JavaScript%2C%20a%20cookie%20can,date%20(in%20UTC%20time).

/* global window self */
const isBrowser = typeof window !== 'undefined' 
  && typeof window.document !== 'undefined';

const isWebWorker = typeof self === 'object'
  && self.constructor
  && self.constructor.name === 'DedicatedWorkerGlobalScope';

const isNode = typeof process !== 'undefined'
  && process.versions != null
  && process.versions.node != null;

const isJsDom = () => (typeof window !== 'undefined' && window.name === 'nodejs')
  || navigator.userAgent.includes('Node.js')
  || navigator.userAgent.includes('jsdom');

export {
  isBrowser, isWebWorker, isNode, isJsDom
};

