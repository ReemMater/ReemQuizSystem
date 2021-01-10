/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  ADD_QUESTION_FAIL,
  DELETE_QUESTION_FAIL,
  LOAD_QUESTIONS,
  UPDATE_QUESTION_FAIL,
  LOAD_QUESTIONS_FAIL,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../Types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };
    case DELETE_QUESTION:
      return {
        ...state,
      };

    case UPDATE_QUESTION:
      return {
        ...state,
      };
    case UPDATE_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOAD_QUESTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};
