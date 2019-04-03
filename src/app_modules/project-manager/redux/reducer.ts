import * as types from './actions'
import { IState } from './state'

export const initialState: IState = {
  contracts: [],
  error: '',
  isLoading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CONTRACTS: {
      return {
        ...state,
        isLoading: true
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
      return {
        ...state,
        contracts: action.payload,
        error: '',
        isLoading: false
      }
    }
    default:
      return state
  }
}
