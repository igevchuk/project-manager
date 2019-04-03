import { Observable } from 'rxjs';
import * as queryString from 'query-string';
import { ApiBase } from './api.base';

class ApiEndpoints extends ApiBase implements ApiEndpoints {
  public getContracts = (options = {}): Observable<any> => {
    const query = queryString.stringify(options)
    const url = `http://localhost/api/v1/pm/contracts/?${query}`
    const contracts$ = this.sendRequest(url)

    return contracts$
  }

  public getUserGroups = (): Observable<any> => {
    const url = 'http://localhost/usermanagement/api/v1/user?groups=7'
    const users$ = this.sendRequest(url)
    
    return users$
  }
}
export default new ApiEndpoints();
