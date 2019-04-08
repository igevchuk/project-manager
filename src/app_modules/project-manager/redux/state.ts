import { first } from 'rxjs/operators';

export type IState = {
  contracts: contract[],
  counterparties: string[],
  isLoading: boolean,
  error: string,
  templates: any[],
  users: user[],
  workload: workload,
  isLoadingWorkload: boolean
}

export type contract = {
  id: number,
  assigned_negotiator: string,
  counterparty_name: string,
  created: string,
  document_request_id: number,
  product_type: string
}

export type user = {
  id: number,
  date_joined: string,
  email: string,
  first_name: string,
  group_ids: number[],
  group_names: string[],
  groups: string[],
  is_active: boolean,
  last_login: string,
  last_name: string,
  locked_out_time: string,
  url: string,
  username: string,
  userprofile: userprofile
}

export type userprofile = {
  code_created_time: number,
  invite_url: string,
  invited: boolean,
  last_password_changed_time: string,
  locked_out_time: string,
  opted_for_offline: boolean,
  reset_link_code: number
}

export type workload = {
  average_workload: {},
  negotiator_workload: {
    name: string,
    worload: {}
  }
}