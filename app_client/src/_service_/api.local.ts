import { Observable } from 'rxjs';

import { ApiBase } from './api.base';
import * as vm from './view_model/vm.module1';

interface IApiLocal {
  getLocalForm: () => Observable<vm.form>;
}

class ApiLocal extends ApiBase implements IApiLocal {
  private baseUrl = 'http://localhost:3400';

  public getLocalForm = (): Observable<vm.form> => {
    const url = `${this.baseUrl}/form/`;
    const forms$ = this.sendRequest(url);
    return forms$;
  };
}
export default new ApiLocal();
