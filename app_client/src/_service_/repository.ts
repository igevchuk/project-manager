import ApiLocal from './api.local';

const getLocalForm = ApiLocal.getLocalForm;
const postCreateForm = ApiLocal.postCreateForm;

// postCreateForm
// const checkoutForm = factory_formbuilder.postCheckOutForm;
// const copyForm = factory_formbuilder.copyForm;
// const createForm = factory_formbuilder.postCreateForm;
// const disableForm = factory_formbuilder.disableForm;
// const getApiForm = factory_formbuilder.getApiForm;
// const getFormList = factory_formbuilder.getFormList;
// const getLocalForm = factory_formbuilder.getLocalForm;
// const getTemplateList = factory_formbuilder.getTemplateList;
// const publishForm = factory_formbuilder.publishForm;
// const updateActiveForm = factory_formbuilder.updateActiveForm;

const repo = {
  getLocalForm,
  postCreateForm
  // checkoutForm,
  // copyForm,
  // createForm,
  // disableForm,
  // getApiForm,
  // getFormList,
  // getLocalForm,
  // getTemplateList,
  // publishForm,
  // updateActiveForm
};

export default repo;
