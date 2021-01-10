import React, { useReducer } from 'react';

import QuestionContext from './questionContext';
import questionReducer from './questionReducer';
import axios from 'axios';

import {
  ADD_QUESTION,
  DELETE_QUESTION,
  LOAD_QUESTIONS,
  UPDATE_QUESTION_FAIL,
  UPDATE_QUESTION,
  ADD_QUESTION_FAIL,
  DELETE_QUESTION_FAIL,
  LOAD_QUESTIONS_FAIL,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../Types';

const QuestionState = (props) => {
  const initialState = {
    questions: [],
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(questionReducer, initialState);
  //loadQuestion

  const loadQuestions = async () => {
    try {
      const res = await axios.get('/api/question');
      dispatch({
        type: LOAD_QUESTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_QUESTIONS_FAIL,
      });
    }
  };

  //Add Question

  const addQuestion = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/question', formData, config);
      dispatch({
        type: ADD_QUESTION,
        payload: res.data,
      });
      loadQuestions();
    } catch (err) {
      dispatch({
        type: ADD_QUESTION_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Delete Question
  const deleteQuestion = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.delete(
        `/api/question/${formData.id}`,
        formData,
        config
      );
      dispatch({
        type: DELETE_QUESTION,
        payload: res.data,
      });
      loadQuestions();
    } catch (err) {
      dispatch({
        type: DELETE_QUESTION_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Update Question
  const updateQuestion = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/question/${formData.id}`,
        formData,
        config
      );
      dispatch({
        type: UPDATE_QUESTION,
        payload: res.data,
      });
      loadQuestions();
    } catch (err) {
      dispatch({
        type: UPDATE_QUESTION_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  const setcurrent = (question) => {
    dispatch({ type: SET_CURRENT, payload: question });
  };
  //clear current Question
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <QuestionContext.Provider
      value={{
        questions: state.questions,
        current: state.current,
        error: state.error,
        addQuestion,
        deleteQuestion,
        updateQuestion,
        loadQuestions,

        setcurrent,
        clearCurrent,
      }}>
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
