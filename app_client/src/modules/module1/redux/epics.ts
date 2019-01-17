import { from, of } from 'rxjs';
import {
  map,
  // mergeMap,
  switchMap,
  filter,
  // concatMap,
  catchError
} from 'rxjs/operators';
import { Epic } from 'redux-observable'; // ofType
import { ActionType, isActionOf } from 'typesafe-actions';

import * as actions from './actions';
import { getWeather } from './api';
import { RootState } from './reducer';

type Action = ActionType<typeof actions>;

// import {
//   getApiForms,
//   getFormList,
//   getLocalForms,
//   publishForm
// } from './service';

const weatherGetEpic: Epic<Action, Action, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.weatherGetAction)),
    switchMap(action =>
      from(getWeather(action.payload.lat, action.payload.lng)).pipe(
        map(actions.weatherSetAction),
        catchError(error => of(actions.weatherErrorAction(error)))
      )
    )
  );

export default [weatherGetEpic];

// export const postCheckoutFormEpic: Epic<Action, Action, {}> = (
//   action$,
//   store
// ) => {
//   return action$.pipe(
//     ofType(types.CHECKOUT_FORM),
//     mergeMap((action: types.checkoutForm) => {
//       const { activeForm } = store.value.formbuilderReducer;
//       const formId = action.payload;

//       return checkoutForm(formId).pipe(
//         concatMap(response => [
//           { type: types.CHECKOUT_FORM_FULFILLED, response },
//           updateActiveForm(activeForm)
//         ]),
//         catchError(({ response, message }) =>
//           of({ type: types.CHECKOUT_FORM_FAILED })
//         )
//       );
//     })
//   );
// };
