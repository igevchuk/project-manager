import { combineEpics } from 'redux-observable';
import fetchLocalFormEpic from './../app/redux/epics';

const appEpic = combineEpics(fetchLocalFormEpic);

export default appEpic;
