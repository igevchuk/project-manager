import { combineEpics } from 'redux-observable';
import { 
  fetchContractsEpic, 
  fetchCounterpartiesEpic,
  fetchTemplatesEpic,
  fetchUserGroupsEpic,
  fetchWorkload,
  postContractsEpic,
  searchContractsEpic 
} from './../app_modules/project-manager/redux/epics'

const appEpic = combineEpics(
  fetchContractsEpic, 
  fetchCounterpartiesEpic,
  fetchTemplatesEpic,
  fetchUserGroupsEpic,
  fetchWorkload,
  postContractsEpic,
  searchContractsEpic
);

export default appEpic;
