import { combineEpics } from 'redux-observable';
import fetchLocalFormEpic from './../app/redux/epics';
// import { postAddAnnotation, postCreateAnnotation } from "./../app_modules/template/redux/epics";

const appEpic = combineEpics(fetchLocalFormEpic);

export default appEpic;
