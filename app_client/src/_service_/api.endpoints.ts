import { Observable } from 'rxjs';
import fetch from 'window-fetch';

import { ApiBase } from './api.base';
import * as vm from './view_model/appModel';

interface IApiEndpoints {
  getTemplate: () => Observable<vm.template>;
}

class ApiEndpoints extends ApiBase implements ApiEndpoints {
  private baseUrl =
    process.env.NODE_ENV === 'production'
      ? '/template'
      : 'http://localhost:3004';

  // api/v1/template_data/b8c49d68-03b3-46f1-a079-0f83e0151573/
  public getTemplate = (): Observable<vm.template> => {
    const url = `${this.baseUrl}/templates/`;
    // const url = `https://dtrax-tm2.analytics.deloitte.ca/template/api/v1/template_data/b8c49d68-03b3-46f1-a079-0f83e0151573`;

    const forms$ = this.sendRequest(url);
    return forms$;
  };

  public postCreateTemplate = () => {
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

  public postCreateTemplate2 = (): Observable<any> => {
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
export default new ApiEndpoints();
