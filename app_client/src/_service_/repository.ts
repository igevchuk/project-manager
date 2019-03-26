import ApiLocal from './api.endpoints';

const getTemplate = ApiLocal.getTemplate;
const postCreateTemplate = ApiLocal.postCreateTemplate;
const postAnnotation = ApiLocal.postAnnotation;

const repo = {
  getTemplate,
  postCreateTemplate
};

export default repo;
