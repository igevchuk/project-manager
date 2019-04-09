import { Observable } from 'rxjs';
import * as queryString from 'query-string';
import { ApiBase } from './api.base';
// api/v1/pm/contracts/?search=1&ordering=counterparty_name

// POST: /api/v1/pm/contracts/
// {"assigned_negotiator": 2, "contracts": [1]}

// POST: /api/v1/pm/contracts/
// {"assigned_negotiator": 2, "contracts": [1, 2]}

// /api/v1/pm/workload/

// returns:
// {
// "average_workload": {
// "In Negotiation": 0,
// "Client Signed": 0,
// "With Client": 2,
// "To be sent": 0,
// "Signed": 0
// },
// "negotiator_workload": {
// "2": {
// "workload": {
// "In Negotiation": 0,
// "To be sent": 1,
// "Client Signed": 0,
// "With Client": 2,
// "Signed": 0
// },
// "name": "Contract Negotiator"
// }
// }
// }

const baseUrl = 'http://localhost/'

class ApiEndpoints extends ApiBase implements ApiEndpoints {
  public getContracts = (options = {}): Observable<any> => {
    const query = queryString.stringify(options)
    const url = `${baseUrl}api/v1/pm/contracts/?${query}`
    const contracts$ = this.sendRequest(url)

    return contracts$
  }

  public getTemplates = (): Observable<any> => {
    const url = `${baseUrl}api/get_template_list/`
    const templates$ = this.sendRequest(url)
    
    return templates$
  }

  public getCounterparties = (): Observable<any> => {
    const url = `${baseUrl}api/v1/pm/counterparties/`
    const counterparties$ = this.sendRequest(url)
    
    return counterparties$
  }

  public getUserGroups = (): Observable<any> => {
    const url = `${baseUrl}usermanagement/api/v1/user?groups=7`
    const users$ = this.sendRequest(url)
    
    return users$
  }

  public getWorkload = (): Observable<any> => {
    const url = `${baseUrl}api/v1/pm/workload/`
    const workload$ = this.sendRequest(url)
    
    return workload$
  }

  public postContracts = (data: {}): Observable<any> => {
    const url = `${baseUrl}api/v1/pm/contracts/`
    const contracts$ = this.sendRequest(url, 'POST', data)
    
    return contracts$
  }
}
export default new ApiEndpoints();
