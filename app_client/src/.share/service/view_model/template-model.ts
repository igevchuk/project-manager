export type IState = {};

export enum action {
  N = 'Null',
  U = 'Update',
  I = 'Insert',
  D = 'Delete'
}

export enum status {
  draft,
  published
}
