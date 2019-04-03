import ApiLocal from './api.endpoints';

const getContracts = ApiLocal.getContracts;
const getUserGroups = ApiLocal.getUserGroups;

const repo = {
  getContracts,
  getUserGroups,
};

export default repo;
