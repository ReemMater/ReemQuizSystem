import React, { useContext, Fragment, useEffect } from 'react';
import QuestionContext from '../../../context/questions/questionContext';
import QuestionItem from './QuestionItem';

const QuestionsPage = () => {
  const questionContext = useContext(QuestionContext);

  const { questions, loadQuestions } = questionContext;
  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {questions.map((question) => (
        <QuestionItem key={question._id} question={question} />
      ))}
    </Fragment>
  );
};

export default QuestionsPage;
