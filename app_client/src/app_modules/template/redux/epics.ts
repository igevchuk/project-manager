import { from, of, concat } from 'rxjs';
import { map, switchMap, flatMap, catchError } from 'rxjs/operators'; // filter
import { Epic, ofType } from 'redux-observable'; // ofType
import { ActionType } from 'typesafe-actions'; // isActionOf
import * as actions from './actions';
import * as appActions from '../../../app/redux/actions';
import repo from './../../../_service_/repository';

type Action = ActionType<typeof actions>;

// const fetchLocalFormEpic: Epic<Action, Action, {}> = (action$, store) =>
//   action$.pipe(
//     ofType(actions.FETCH_FORM),
//     switchMap(action => {
//       const article = {
//         id: 2,
//         name: 'stringaaa',
//         ref: { templateId: 111 }
//       };

//       const templates = repo.getTemplate();
//       return from(templates).pipe(
//         map(response => actions.fetchFormFulfilled(response)),
//         catchError(error => of(actions.formErrorAction(error)))
//       );
//     })
//   );

// export default fetchLocalFormEpic;

// To be confirmed upon BS integration 
interface IAppState {
  appReducer: {
    template: {
      annotations: [],
      tags: []
    }
  }
}

// export const postAddAnnotation: Epic<any, any, any> = (action$, store) =>
//   action$.pipe(
//     ofType(actions.ADD_ANNOTATION_PENDING),
//     switchMap(action => {
//       const prevData = store.value as IAppState
//       const newAnnotations = [...prevData.appReducer.template.annotations, ...action.payload]
//       const sendData = {...prevData.appReducer.template, annotations: newAnnotations} // action.payload[0]
//       return repo.postAnnotation(sendData).pipe(
//         flatMap(response => (
//           concat( 
//             of({type: actions.ADD_ANNOTATION_SUCCESS, payload: {}}),
//             of({type: appActions.FETCH_TEMPLATE}))
//         )),
//         catchError(error => of({type: actions.ADD_ANNOTATION_ERROR, payload: {}}))
//       );
//     })
//   )

  // export const postCreateAnnotation: Epic<any, any, any> = (action$, store) =>
  // action$.pipe(
  //   ofType(actions.CREATE_ANNOTATION_PENDING),
  //   switchMap(action => {
  //     const prevData = store.value as IAppState
  //     const newAnnotations = [...prevData.appReducer.template.annotations, ...action.payload.annotations]
  //     const newTags = [...prevData.appReducer.template.tags, ...action.payload.tags]
  //     const sendData = {...prevData.appReducer.template, annotations: newAnnotations, tags: newTags}
  //     return repo.postAnnotation(sendData).pipe(
  //       flatMap(response => (
  //         concat( 
  //           of({type: actions.CREATE_ANNOTATION_SUCCESS, payload: {}}),
  //           of({type: appActions.FETCH_TEMPLATE}))
  //       )),
  //       catchError(error => of({type: actions.CREATE_ANNOTATION_ERROR, payload: {}}))
  //     );
  //   })
  // )
