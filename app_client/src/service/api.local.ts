import { Observable } from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
// import * as queryString from 'query-string';

// import 'rxjs/add/observable/dom/ajax';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/of';

import { ApiBase } from './api.base';
// import { vm as vm1 } from './view_model/vm.module1';

class ApiLocal extends ApiBase {
  // Get local form
  public getLocalForm = (): Observable<any> => {
    const url = `${this.baseUrl}/form/`;
    const forms$ = this.sendRequest(url);
    return forms$;
  };

  // public getApiForm = (id?: number): Observable<vm1.vm.form> => {
  //   const formId = 1;
  //   const url = `${this.baseApiUrl}/form/${formId}/`;
  //   const forms$ = this.sendRequest(url);
  //   return forms$;
  // };

  // // Get a all forms
  // public getFormList = (params?: any): Observable<any> => {
  //   let url = `${this.baseUrl}/forms/`;
  //   if (typeof params === 'object') {
  //     url = `${url}${queryString.stringify(params)}`;
  //   }
  //   const forms$ = this.sendRequest(url);
  //   return forms$;
  // };

  // // Check in form
  // public postCheckInForm = (formId: number): Observable<any> => {
  //   const url = `${this.baseUrl}/forms/${formId}/check_in/`;
  //   const checkedInForm$ = this.sendRequest(url, 'POST');

  //   return checkedInForm$;
  // };

  // // Check out form
  // public postCheckOutForm = (formId: number): Observable<any> => {
  //   const url = `${this.baseUrl}/forms/${formId}/check_out/`;
  //   const checkedOutForm$ = this.sendRequest(url, 'POST');

  //   return checkedOutForm$;
  // };

  // // Create new form
  // public postCreateForm = (data: any): Observable<any> => {
  //   const url = `${this.baseUrl}/forms/update/0`;

  //   return this.sendRequest(url, 'POST', data);
  // };

  // public publishForm = (formId: number): Observable<any> => {
  //   alert('publish goes to repository');
  //   const url = `${this.baseUrl}/form_builder/`;
  //   const forms$ = this.sendRequest(url);
  //   return forms$;
  // };

  // public copyForm = (formId: number): Observable<any> => {
  //   const url = `${this.baseUrl}/copy/${formId}`;

  //   return this.sendRequest(url);
  // };

  // public disableForm = (
  //   formId: number,
  //   disabled?: boolean
  // ): Observable<any> => {
  //   const url = `${this.baseUrl}/disable/${formId}`;

  //   return this.sendRequest(url);
  // };

  // public updateActiveForm = (updatedForm: any): Observable<any> => {
  //   console.log(updatedForm);
  //   debugger;
  //   const activeFormId = updatedForm.id;
  //   const method = 'POST';
  //   const url = `${this.baseApiUrl}/formupdate/${activeFormId}/`;
  //   const updatedForm$ = this.sendRequest(url, method, updatedForm);

  //   updatedForm$.subscribe(res => {
  //     console.log(JSON.stringify(res, null, 2));
  //   });

  //   return updatedForm$;
  // };

  // // Get template list
  // public getTemplateList = (): Observable<any> => {
  //   const url = `${this.baseUrl}/templates/`;
  //   const templates$ = this.sendRequest(url);

  //   return templates$;
  // };

  private sendRequest(
    url: string,
    verb?: string,
    requestBody?: any
  ): Observable<any> {
    const method = !!verb ? verb : 'GET';
    const body = !!requestBody ? requestBody : '';
    const headers = {
      'X-CSRFToken': localStorage.getItem('csrftoken'),
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json'
    };

    const request: AjaxRequest = {
      url,
      body,
      headers,
      method,
      crossDomain: true,
      withCredentials: true
    };

    return ajax(request).pipe(map(e => e.response));
  }
}
export default new ApiLocal();

// /**
// -- General --
// Request URL: http://127.0.0.1:9000/formbuilder/api/formupdate/1/
// Request Method: POST
// Status Code: 500 Internal Server Error
// Remote Address: 127.0.0.1:9000
// Referrer Policy: no-referrer-when-downgrade
//  */

// /**
//  --Request Headers--
// POST /formbuilder/api/formupdate/1/ HTTP/1.1
// Host: 127.0.0.1:9000
// Connection: keep-alive
// Content-Length: 2
// Accept: application/json
// Origin: http://127.0.0.1:9000
// X-CSRFToken: rTWz7i94TRXjRnzFLMbr8XHdbQBn6Wc94MwIAZJLQ7FZwilm2RA86mKFWdiGxgsJ
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
// Content-Type: application/json
// Referer: http://127.0.0.1:9000/schema/
// Accept-Encoding: gzip, deflate, br
// Accept-Language: en,en-US;q=0.9
// Cookie: csrftoken=Pprxy8FEX8U5IRfVMEOXWzsHTh0hGH3Wsi1G1PflUoCLnM1C3JdEUYv9EEHA71jw
// */

// /**
// --Response Headers--
// HTTP/1.0 500 Internal Server Error
// Date: Fri, 02 Nov 2018 17:20:50 GMT
// Server: WSGIServer/0.2 CPython/3.6.6
// Content-Type: text/html
// X-Frame-Options: SAMEORIGIN
// Content-Length: 79606
//  */
