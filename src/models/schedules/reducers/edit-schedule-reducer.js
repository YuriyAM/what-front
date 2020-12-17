import * as actionTypes from '../types.js'

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const editScheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.EDITING_SCHEDULE_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };
    case actionTypes.EDITING_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.schedule,
      };
    case actionTypes.EDITING_SCHEDULE_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false
      };
    default: return state;
  }
}