export type IState = {
  contracts: contract[],
  isLoading: boolean,
  error: string
}

export type contract = {
  id: number,
  assigned_negotiator: string,
  counterparty_name: string,
  created: string,
  document_request_id: number,
  product_type: string
}