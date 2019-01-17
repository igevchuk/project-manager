import { combineEpics } from "redux-observable";
import {
  fetchApiFormsEpic,
  fetchLocalFormsEpic,
  fetchTemplateListEpic,
  postCheckinFormEpic,
  postCheckoutFormEpic,
  publishFormEpic
} from "./../components/formeditor/redux/epics";

export const rootEpic = combineEpics(
  fetchApiFormsEpic,
  fetchLocalFormsEpic,
  fetchTemplateListEpic,
  postCheckinFormEpic,
  postCheckoutFormEpic,
  publishFormEpic
);
