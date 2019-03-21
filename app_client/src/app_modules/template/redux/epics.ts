import { from, of } from 'rxjs';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators'; // filter
import { Epic, ofType } from 'redux-observable'; // ofType
import { ActionType } from 'typesafe-actions'; // isActionOf
// import * as actions from './actions';
import * as actions from './actions';

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

export const fetchLocalTemplateEpic = action$ =>
  action$.pipe(
    ofType(actions.FETCH_LOCAL_TEMPLATE),
    mergeMap(action => {
      console.log('ssssssss');
      debugger;
      return repo
        .getTemplate()
        .pipe(map(response => actions.templateErrorAction(response)));
    })
  );
export default fetchLocalTemplateEpic;
