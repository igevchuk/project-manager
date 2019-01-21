import { Observable } from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

export class ApiBase {
  protected sendRequest(
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
