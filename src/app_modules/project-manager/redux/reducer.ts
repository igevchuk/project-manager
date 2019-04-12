import * as types from './actions'
import { IState, workload } from './state'
import { type } from 'os';

export const initialState: IState = {
  contracts: [],
  allResults: null,
  templates: [],
  counterparties: [],
  error: '',
  isLoading: false,
  users: [],
  workload: {} as workload,
  isLoadingWorkload: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CONTRACTS:
    case types.POST_CONTRACTS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case types.POST_CONTRACTS_SUCCESS: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.FETCH_CONTRACTS_FAILED: {
      return {
        ...state,
        error: action.message,
        isLoading: false
      }
    }
    case types.FETCH_CONTRACTS_SUCCESS: {
      const nextState = {
        ...state,
        contracts: [...action.payload],
        error: '',
        isLoading: false
      }
      nextState.allResults = nextState.allResults === null ? [...action.payload] : nextState.allResults
      return nextState
    }

    case types.FETCH_COUNTERPARTIES: {
      return {
        ...state
      }
    }

    case types.FETCH_COUNTERPARTIES_SUCCESS: {
      return {
        ...state,
        counterparties: action.payload
      }
    }

    case types.FETCH_TEMPLATES: {
      return {
        ...state
      }
    }
    case types.FETCH_TEMPLATES_SUCCESS: {
      return {
        ...state,
        templates: action.payload
      }
    }

    case types.FETCH_USER_GROUPS_SUCCESS: {
      return {
        ...state,
        users: action.payload
      }
    }
    case types.FETCH_USER_GROUPS_FAILED: {
      return {
        ...state,
        users: initialState.users
      }
    }

    case types.FETCH_WORKLOAD: {
      return {
        ...state,
        isLoadingWorkload: true
      }
    }
    case types.FETCH_WORKLOAD_FAILED: {
      return {
        ...state,
        isLoadingWorkload: false
      }
    }
    case types.FETCH_WORKLOAD_SUCCESS: {
      return {
        ...state,
        workload: action.payload,
        isLoadingWorkload: false
      }
    }
    default:
      return state
  }
}
