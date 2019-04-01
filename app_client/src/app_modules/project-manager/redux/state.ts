export type IState = {
  contracts: contract[],
  isLoading: boolean,
  error: string
}

export type contract = {
  id?: number
}