import { from, of, concat } from 'rxjs'
import { map, debounceTime, switchMap, flatMap, filter, catchError, takeUntil } from 'rxjs/operators'
import { Epic, ofType } from 'redux-observable'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import repo from './../../../_service_/repository'

type Action = ActionType<typeof actions>

export const fetchContractsEpic = action$ =>
  action$.pipe(
    ofType(actions.FETCH_CONTRACTS),
    switchMap((action: any) => {
      return repo
        .getContracts(action.payload)
        .pipe(
          map(response => response.results),
          map(results => actions.fetchContractsSuccess(results))
        )
    })
  )

export const searchContractsEpic = action$ => 
  action$.pipe(
    ofType(actions.SEARCH_CONTRACTS),
    debounceTime(300),
    filter(({ payload }) => !!payload.search && !!payload.search.trim()),
    switchMap((action: any) => {
      return repo
        .getContracts(action.payload)
        .pipe(
          map(response => response.results),
          map(results => actions.fetchContractsSuccess(results))
        )
    })
  )

export const fetchUserGroupsEpic = action$ => 
  action$.pipe(
    ofType(actions.FETCH_USER_GROUPS),
    switchMap((action: any) => {
      return repo
        .getUserGroups()
        .pipe(
          map(response => response.results),
          map(results => actions.fetchUserGroupsSuccess(results))
        )
    })
  )

export default fetchContractsEpic
