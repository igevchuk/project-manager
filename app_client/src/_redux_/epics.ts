import { combineEpics } from 'redux-observable';
import fetchLocalFormEpic from './../app/redux/epics';
import fetchLocalTemplateEpic from './../app_modules/template/redux/epics';

const appEpic = combineEpics(fetchLocalFormEpic, fetchLocalTemplateEpic);

export default appEpic;
