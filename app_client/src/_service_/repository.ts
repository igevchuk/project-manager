import ApiLocal from './api.endpoints';

const getContracts = ApiLocal.getContracts;
const getTemplate = ApiLocal.getTemplate;
const postCreateTemplate = ApiLocal.postCreateTemplate;
const postAnnotation = ApiLocal.postAnnotation;

const repo = {
  getContracts,
  getTemplate,
  postCreateTemplate
};

export default repo;
