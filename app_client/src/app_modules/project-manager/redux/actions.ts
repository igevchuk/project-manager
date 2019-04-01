export const FETCH_CONTRACTS = 'FETCH_CONTRACTS'
export const FETCH_CONTRACTS_CANCEL = 'FETCH_CONTRACTS_CANCEL'
export const FETCH_CONTRACTS_FAILED = 'FETCH_CONTRACTS_FAILED'
export const FETCH_CONTRACTS_SUCCESS = 'FETCH_CONTRACTS_SUCCESS'
export const SEARCH_CONTRACTS = 'SEARCH_CONTRACTS'

export const fetchContracts = (options: {} = {}) : {} => ({
  type: FETCH_CONTRACTS,
  payload: options
})

export const fetchContractsFailed = (message: string = '') : {} => ({
  type: FETCH_CONTRACTS_FAILED,
  message
})

export const fetchContractsSuccess = (payload: {}) : {} => ({
  type: FETCH_CONTRACTS_SUCCESS,
  payload
})

export const searchContracts = (options: {}) : {} => ({
  type: SEARCH_CONTRACTS,
  payload: options
})

