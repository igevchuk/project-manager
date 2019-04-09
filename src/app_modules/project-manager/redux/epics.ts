import { from, of, concat } from 'rxjs'
import { map, debounceTime, switchMap, flatMap, filter, catchError, timeout, takeUntil } from 'rxjs/operators'
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
          map(results => actions.fetchContractsSuccess(results)),
          // catchError(err => of(actions.fetchContractsFailed(err.toString())))
        )
    })
  )

export const fetchCounterpartiesEpic = action$ => 
  action$.pipe(
    ofType(actions.FETCH_COUNTERPARTIES),
    switchMap((action: any) => {
      return repo
        .getCounterparties()
        .pipe(
          map(({ counterparties }) => counterparties),
          map(counterparties => actions.fetchCounterpartiesSuccess(counterparties)),
          // catchError(err => of(({ type: actions.FETCH_COUNTERPARTIES_FAILED })))
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
          map(results => actions.fetchContractsSuccess(results)),
          // catchError(err => of(actions.fetchContractsFailed(err.toString())))
        )
    })
  )

export const fetchTemplatesEpic = action$ => 
  action$.pipe(
    ofType(actions.FETCH_TEMPLATES),
    switchMap((action: any) => {
      return repo
        .getTemplates()
            .pipe(
              map((results: any) => actions.fetchTemplatesSuccess(results)),
              // catchError(err => of({ type: actions.FETCH_TEMPLATES_FAILED }))
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
          map(results => actions.fetchUserGroupsSuccess(results)),
          // catchError(err => of({ type: actions.FETCH_USER_GROUPS_FAILED }))
        )
    })
  )

export const fetchWorkload= action$ => 
  action$.pipe(
    ofType(actions.FETCH_WORKLOAD),
    switchMap((action: any) => {
      return repo
        .getWorkload()
        .pipe(
          map((results: any) => actions.fetchWorkloadSuccess(results)),
          // catchError(err => of({ type: actions.FETCH_WORKLOAD_FAILED }))
        )
    })
  )

export const postContractsEpic= action$ => 
  action$.pipe(
    ofType(actions.POST_CONTRACTS),
    switchMap((action: any) => {
      return repo
        .postContracts(action.payload)
        .pipe(
          map(response => response),
          map(results => ({ type: actions.POST_CONTRACTS_SUCCESS })),
          // catchError(err => of({ type: actions.POST_CONTRACTS_FAILED }))
        )
    })
  )

export default fetchContractsEpic
