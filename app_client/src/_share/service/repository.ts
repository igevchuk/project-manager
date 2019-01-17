import factory_formbuilder from './api_formbuilder';

const checkinForm = factory_formbuilder.postCheckInForm;
const checkoutForm = factory_formbuilder.postCheckOutForm;
const copyForm = factory_formbuilder.copyForm;
const createForm = factory_formbuilder.postCreateForm;
const disableForm = factory_formbuilder.disableForm;
const getApiForm = factory_formbuilder.getApiForm;
const getFormList = factory_formbuilder.getFormList;
const getLocalForm = factory_formbuilder.getLocalForm;
const getTemplateList = factory_formbuilder.getTemplateList;
const publishForm = factory_formbuilder.publishForm;
const updateActiveForm = factory_formbuilder.updateActiveForm;

const repo = {
  checkinForm,
  checkoutForm,
  copyForm,
  createForm,
  disableForm,
  getApiForm,
  getFormList,
  getLocalForm,
  getTemplateList,
  publishForm,
  updateActiveForm
};

export default repo;
