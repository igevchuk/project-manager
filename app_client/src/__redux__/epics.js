import { combineEpics } from 'redux-observable';
import toolbarEpic from './../../app_modules/toolbar/redux/epics';

const appEpic = combineEpics(toolbarEpic);

export default appEpic;
