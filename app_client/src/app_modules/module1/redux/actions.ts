import { createAction as createReduxAction } from 'redux-actions';
import { createAction } from 'typesafe-actions';
// import { Form } from "./model";

// Action defination
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_ALL = 'COMPLETE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// Action defination
export const FETCH_FORMS = 'formbuilder/FETCH_FORMS';
export const FETCH_API_FORMS = 'formbuilder/FETCH_API_FORMS';
export const FETCH_LOCAL_FORMS = 'formbuilder/FETCH_LOCAL_FORMS';
export const FETCH_FORMS_FULFILLED = 'formbuilder/FETCH_FORMS_FULFILLED';
export const MAPPING_FORMS = 'formbuilder/MAPPING_FORMS';
export const PUBLISH_FORM = 'formbuilder/PUBLISH_FORM';

const fetchForms = createReduxAction<void>(FETCH_FORMS, () => '');

const publishForm = createReduxAction<number, number>(
  PUBLISH_FORM,
  (id: number) => id
);

export { fetchForms, publishForm };

// ====================================
export const MAP_READY = '@@map/READY';
export const WEATHER_GET = '@@weather/GET';
export const WEATHER_SET = '@@weather/SET';
export const WEATHER_ERROR = '@@weather/ERROR';
export const weatherGetAction = createAction(
  WEATHER_GET,
  resolve => (lat: number, lng: number) => resolve({ lat, lng })
);
export const weatherSetAction = createAction(
  WEATHER_SET,
  resolve => (weather: Response) => resolve(weather)
);
export const weatherErrorAction = createAction(
  WEATHER_ERROR,
  resolve => (error: Error) => resolve(error)
);
export const mapReadyAction = createAction(MAP_READY);

// ==========================

// Loading state -> FETCH_SEARCH_DATA
// Success -> FETCH_SEARCH_SUCCESS
// Failure -> FETCH_SEARCH_FAILURE

export const FETCH_SEARCH_DATA = 'FETCH_SEARCH_DATA';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_SUCCESS';

export function fetchSearchData(args) {
  return async dispatch => {
    // Initiate loading state
    dispatch({
      type: FETCH_SEARCH_DATA
    });
    try {
      // Call the API
      const result = null; // = await fetchSearchData_(args.pageCount, args.itemsPerPage);

      // Update payload in reducer on success
      dispatch({
        type: FETCH_SEARCH_SUCCESS,
        payload: result,
        currentPage: args.pageCount
      });
    } catch (err) {
      // Update error in reducer on failure
      dispatch({
        type: FETCH_SEARCH_FAILURE,
        error: err
      });
    }
  };
}
