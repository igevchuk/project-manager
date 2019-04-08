import ApiLocal from './api.endpoints'

const getContracts = ApiLocal.getContracts
const getCounterparties = ApiLocal.getCounterparties
const getTemplates = ApiLocal.getTemplates
const getUserGroups = ApiLocal.getUserGroups
const getWorkload = ApiLocal.getWorkload
const postContracts = ApiLocal.postContracts

const repo = {
  getContracts,
  getCounterparties,
  getTemplates,
  getUserGroups,
  getWorkload,
  postContracts
};

export default repo;
