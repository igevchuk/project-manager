import { combineEpics } from 'redux-observable';
import fetchContractsEpic, { searchContractsEpic } from './../app_modules/project-manager/redux/epics'
import fetchLocalFormEpic from './../app/redux/epics';
import fetchLocalTemplateEpic from './../app_modules/template/redux/epics';

const appEpic = combineEpics(
  fetchContractsEpic, 
  fetchLocalFormEpic, 
  fetchLocalTemplateEpic, 
  searchContractsEpic
);

export default appEpic;
