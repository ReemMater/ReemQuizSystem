import React, { useState, useContext, useEffect } from 'react';
import QuestionContext from '../../../context/questions/questionContext';

const QuestionForm = () => {
  const questionContext = useContext(QuestionContext);
  const {
    addQuestion,
    updateQuestion,
    current,
    loadQuestions,
    clearCurrent,
  } = questionContext;

  useEffect(() => {
    if (current !== null) {
      setQuestion(current);
    } else {
      setQuestion({
        questiontext: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        correct: 'A',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionContext, current]);
  const [question, setQuestion] = useState({
    questiontext: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    correct: 'A',
  });

  const clearAll = () => {
    setQuestion({
      questiontext: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      correct: 'A',
    });
    clearCurrent();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addQuestion(question);
      setQuestion({
        questiontext: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        correct: 'A',
      });
    } else {
      updateQuestion({
        id: current._id,
        questiontext: question.questiontext,
        choice1: question.choice1,
        choice2: question.choice2,
        choice3: question.choice3,
        choice4: question.choice4,
        correct: question.correct,
      });
      clearCurrent();
      loadQuestions();
      setQuestion({
        questiontext: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        correct: 'A',
      });
    }
  };

  const {
    questiontext,
    choice1,
    choice2,
    choice3,
    choice4,
    correct,
  } = question;

  const onChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  return (
    <div
      className='card bg-light split'
      style={{ position: 'fixed', minWidth: '400px' }}>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
          {current ? 'Edit Question' : 'Add Question'}
        </h2>
        <input
          type='text'
          placeholder='Enter Question'
          name='questiontext'
          value={questiontext}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Enter Choice 1'
          name='choice1'
          value={choice1}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Enter Choice 2'
          name='choice2'
          value={choice2}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Enter Choice 3'
          name='choice3'
          value={choice3}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Enter Choice 4'
          name='choice4'
          value={choice4}
          onChange={onChange}
        />
        <h5>Correct Answer</h5>
        <div className='row my-0 py-0'>
          <div className='col-6'>
            <input
              type='radio'
              name='correct'
              value='A'
              onChange={onChange}
              checked={correct === 'A'}
            />{' '}
            {'   '}Choice A
          </div>
          <div className='col-6'>
            <input
              type='radio'
              name='correct'
              value='B'
              onChange={onChange}
              checked={correct === 'B'}
            />{' '}
            {'   '}Choice B
          </div>
        </div>
        <div className='row my-0 py-0'>
          <div className='col-6'>
            <input
              type='radio'
              name='correct'
              value='C'
              onChange={onChange}
              checked={correct === 'C'}
            />{' '}
            {'   '}Choice C
          </div>
          <div className='col-6'>
            <input
              type='radio'
              name='correct'
              value='D'
              onChange={onChange}
              checked={correct === 'D'}
            />{' '}
            {'   '}Choice D
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <input
              type='submit'
              value={current ? 'Update Question' : 'Add Question'}
              className='btn btn-primary btn-block '
            />
          </div>
          <div className='col-6'>
            {current && (
              <input
                type='button'
                value='Clear'
                className='btn btn-danger btn-block '
                onClick={clearAll}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
