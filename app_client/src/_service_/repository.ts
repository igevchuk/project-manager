import ApiLocal from './api.endpoints';

const getTemplate = ApiLocal.getTemplate;
const postCreateTemplate = ApiLocal.postCreateTemplate;

const repo = {
  getTemplate,
  postCreateTemplate
};

export default repo;
