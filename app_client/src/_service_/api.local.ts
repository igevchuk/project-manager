import { Observable } from 'rxjs';
import fetch from 'window-fetch';

import { ApiBase } from './api.base';
import * as vm from './view_model/vm.module1';

interface IApiLocal {
  getLocalForm: () => Observable<vm.form>;
}

class ApiLocal extends ApiBase implements IApiLocal {
  private baseUrl = process.env.NODE_ENV === "production"? '/template':'http://localhost:3004';

  // public getLocalForm = (): Observable<vm.form> => {
  //   const url = `${this.baseUrl}/form/`;
  //   const forms$ = this.sendRequest(url);
  //   return forms$;
  // };

  public getLocalForm = (): Observable<any> => {
    const url = `${this.baseUrl}/templates/`;
    const forms$ = this.sendRequest(url);
    return forms$;
  };

  public postLocalForm0 = (): Observable<any> => {
    const url = `${this.baseUrl}/templates/`;
    const forms$ = this.sendRequest(url);
    return forms$;
  };

  public postCreateForm = () => {
    const body = [
      {
        id: 1,
        name: 'name 1',
        last_edited_date: 1519904640,
        last_edited_by: 'Abrar Huq asd',
        created: 1519904640,
        checked_out: false,
        linked_to_template: 'Yes',
        status: 'Draft'
      },
      {
        id: 2,
        name: 'name 2',
        last_edited_date: 1519904640,
        last_edited_by: 'Abrar Huq dsa',
        created: 1519904640,
        checked_out: true,
        linked_to_template: 'No',
        status: 'Draft'
      },
      {
        id: 3,
        name: 'name 3',
        last_edited_date: 1519904640,
        last_edited_by: 'Abrar Huq aaaa',
        created: 1519904640,
        checked_out: false,
        linked_to_template: 'Yes',
        status: 'Published'
      },
      {
        id: 4,
        name: 'name 4',
        last_edited_date: 1519904641,
        last_edited_by: 'Abrar Huq bbbb',
        created: 1519904640,
        checked_out: false,
        linked_to_template: 'No',
        status: 'Draft'
      }
    ];

    fetch(`${this.baseUrl}/templates/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  public postCreateForm10 = (): Observable<any> => {
    const body = {
      id: 4104424,
      name: 'eu do nulla labore quis',
      email: 'G4j@GygLRWq.hlg'
    };

    // fetch('http://localhost:3004/user/', {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then(res => res.json())
    //   .then(json => console.log(json));

    return this.sendRequest(`${this.baseUrl}/templates/`, 'POST', body);
  };
}
export default new ApiLocal();
