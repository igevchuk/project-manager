import { Observable } from 'rxjs';
// import * as queryString from 'query-string';

import { ApiBase } from './api.base';
import * as vm from './view_model/vm.module1';

interface IApiLocal {
  getLocalForm: () => Observable<vm.form>;
}

class ApiLocal extends ApiBase implements IApiLocal {
  public baseUrl = 'http://localhost:3400';
  public baseApiUrl = 'http://127.0.0.1:9000/formbuilder/api';
  public baseApiFullUrl = 'http://127.0.0.1:9000/formbuilder/api/form/1/';
  public postFormUrl = 'http://127.0.0.1:9000/formbuilder/api/formupdate/{id}/';

  // Get local form
  public getLocalForm = (): Observable<vm.form> => {
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

  // private sendRequest(
  //   url: string,
  //   verb?: string,
  //   requestBody?: any
  // ): Observable<any> {
  //   const method = !!verb ? verb : 'GET';
  //   const body = !!requestBody ? requestBody : '';
  //   const headers = {
  //     'X-CSRFToken': localStorage.getItem('csrftoken'),
  //     'Content-Type': 'application/json;charset=UTF-8',
  //     Accept: 'application/json'
  //   };

  //   const request: AjaxRequest = {
  //     url,
  //     body,
  //     headers,
  //     method,
  //     crossDomain: true,
  //     withCredentials: true
  //   };

  //   return ajax(request).pipe(map(e => e.response));
  // }
}
export default new ApiLocal();
