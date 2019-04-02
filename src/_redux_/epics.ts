import { combineEpics } from 'redux-observable';
import { 
  fetchContractsEpic, 
  fetchUserGroupsEpic,
  searchContractsEpic 
} from './../app_modules/project-manager/redux/epics'

const appEpic = combineEpics(
  fetchContractsEpic, 
  fetchUserGroupsEpic,
  searchContractsEpic
);

export default appEpic;
