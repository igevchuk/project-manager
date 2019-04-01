import { from, of, concat } from 'rxjs'
import { map, switchMap, flatMap, mergeMap, catchError } from 'rxjs/operators'
import { Epic, ofType } from 'redux-observable'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import repo from './../../../_service_/repository'

type Action = ActionType<typeof actions>;

export const fetchContractsEpic = action$ =>
  action$.pipe(
    ofType(actions.FETCH_CONTRACTS),
    mergeMap(action => {
      return repo
        .getContracts()
        // .pipe(map(response => actions.fetchContractsSuccess(response)));
        .pipe(map(response => [{id: 1}]));
    })
  );

export default fetchContractsEpic;
