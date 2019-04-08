export const FETCH_CONTRACTS = 'FETCH_CONTRACTS'
export const FETCH_CONTRACTS_CANCEL = 'FETCH_CONTRACTS_CANCEL'
export const FETCH_CONTRACTS_FAILED = 'FETCH_CONTRACTS_FAILED'
export const FETCH_CONTRACTS_SUCCESS = 'FETCH_CONTRACTS_SUCCESS'
export const FETCH_COUNTERPARTIES = 'FETCH_COUNTERPARTIES'
export const FETCH_COUNTERPARTIES_SUCCESS = 'FETCH_COUNTERPARTIES_SUCCESS'
export const FETCH_COUNTERPARTIES_FAILED = 'FETCH_COUNTERPARTIES_FAILED'
export const FETCH_TEMPLATES = 'FETCH_TEMPLATES'
export const FETCH_TEMPLATES_SUCCESS = 'FETCH_TEMPLATES_SUCCESS'
export const FETCH_TEMPLATES_FAILED = 'FETCH_TEMPLATES_FAILED'
export const FETCH_WORKLOAD = 'FETCH_WORKLOAD'
export const FETCH_WORKLOAD_SUCCESS = 'FETCH_WORKLOAD_SUCCESS'
export const FETCH_WORKLOAD_FAILED = 'FETCH_WORKLOAD_FAILED'
export const POST_CONTRACTS = 'POST_CONTRACTS'
export const POST_CONTRACTS_FAILED = 'POST_CONTRACTS_FAILED'
export const POST_CONTRACTS_SUCCESS = 'POST_CONTRACTS_SUCCESS'
export const SEARCH_CONTRACTS = 'SEARCH_CONTRACTS'
export const FETCH_USER_GROUPS = 'FETCH_USER_GROUPS'
export const FETCH_USER_GROUPS_SUCCESS = 'FETCH_USER_GROUPS_SUCCESS'
export const FETCH_USER_GROUPS_FAILED = 'FETCH_USER_GROUPS_FAILED'

export const fetchContracts = (options: {} = {}) : {} => ({
  type: FETCH_CONTRACTS,
  payload: options
})

export const fetchContractsFailed = (message: string = '') : {} => ({
  type: FETCH_CONTRACTS_FAILED,
  message
})

export const fetchUserGroupsFailed = (message: string = '') : {} => ({
  type: FETCH_USER_GROUPS_FAILED,
  message
})

export const fetchContractsSuccess = (payload: {}) : {} => ({
  type: FETCH_CONTRACTS_SUCCESS,
  payload
})

export const fetchUserGroupsSuccess = (payload: {}) : {} => ({
  type: FETCH_USER_GROUPS_SUCCESS,
  payload
})

export const fetchWorkloadSuccess = (payload: {}) : {} => ({
  type: FETCH_WORKLOAD_SUCCESS,
  payload
})

export const postContracts = (payload: {}) : {} => ({
  type: POST_CONTRACTS,
  payload
})

export const searchContracts = (options: {}) : {} => ({
  type: SEARCH_CONTRACTS,
  payload: options
})

export const fetchCounterparties = () : {} => ({
  type: FETCH_COUNTERPARTIES
})

export const fetchCounterpartiesSuccess = (payload: {}) : {} => ({
  type: FETCH_COUNTERPARTIES_SUCCESS,
  payload
})

export const fetchTemplates = () : {} => ({
  type: FETCH_TEMPLATES
})

export const fetchTemplatesSuccess = (payload: {}) : {} => ({
  type: FETCH_TEMPLATES_SUCCESS,
  payload
})

