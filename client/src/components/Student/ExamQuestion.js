/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from 'react';
import QuestionContext from '../../context/questions/questionContext';
//import StudentContext from '../../context/students/studentContext';
import AuthContext from '../../context/auth/authContext';

import { Link } from 'react-router-dom';
function ExamQuestion() {
  const questionContext = useContext(QuestionContext);

  const { loadQuestions } = questionContext;
  useEffect(() => {
    loadQuestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const authContext = useContext(AuthContext);
  const { updateUser } = authContext;
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions = questionContext.questions;

  // const studentContext = useContext(StudentContext);
  // const { finishClick, students } = studentContext;

  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(-1);
  function onChangeValue(e) {
    setAnswer(e.target.value);
  }

  //const student = students.find((student) => student.id === id);

  function NextButton() {
    //question index
    if (questions[questionIndex].correct === String(answer)) {
      let t = score + 1;
      setScore(t);
    }

    var ele = document.getElementsByName('Choise');
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    if (questionIndex < questions.length - 1) {
      let temp = questionIndex + 1;
      setQuestionIndex(temp);
    } else {
      document.getElementById('finish').classList.remove('hide');
      document.getElementById('finish').classList.add('active');
      document.getElementById('NextButton').classList.add('hide');
    }
  }
  let user = {};
  if (authContext.user) {
    user = authContext.user;
  } else {
    user.grade = '..';
  }
  function startQuiz() {
    if (user.grade === '-1') {
      document.getElementById('start').classList.add('hide');
      document.getElementById('questionBlock').classList.add('active');
    } else {
      document.getElementById('MessageBlock').classList.add('active');
    }
  }

  function finishClickButton() {
    let grade = Math.round((score * 100) / questions.length);

    let newUser = { id: user._id, grade: grade };
    updateUser(newUser);
  }

  return (
    <div>
      <header className='py-3 bg-light text-dark my-2'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              {user.grade !== '..' && (
                <button
                  className='btn bg-primary'
                  id='start'
                  onClick={startQuiz}>
                  Start Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <section id='MessageBlock' className='hide'>
        <div className='container'>
          <div className='card'>
            <h1>You Did This Exam Before</h1>
          </div>
        </div>
      </section>
      <section id='questionBlock' className='py-4 my-4 hide'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-header'>
                  {questions.length !== 0 && (
                    <h4>{questions[questionIndex].questiontext}</h4>
                  )}
                </div>
                <div className='card-body' onChange={onChangeValue}>
                  <input type='radio' name='Choise' value='A' />
                  {questions.length !== 0 && (
                    <label
                      htmlFor={questions[questionIndex].choice1}
                      className='px-2'>
                      {' '}
                      {questions[questionIndex].choice1}
                    </label>
                  )}
                  <br />
                  <input type='radio' name='Choise' value='B' />
                  {questions.length !== 0 && (
                    <label
                      htmlFor={questions[questionIndex].choice2}
                      className='px-2'>
                      {' '}
                      {questions[questionIndex].choice2}
                    </label>
                  )}
                  <br />
                  <input type='radio' name='Choise' value='C' />
                  {questions.length !== 0 && (
                    <label
                      htmlFor={questions[questionIndex].choice3}
                      className='px-2'>
                      {' '}
                      {questions[questionIndex].choice3}
                    </label>
                  )}
                  <br />
                  <input type='radio' name='Choise' value='D' />
                  {questions.length !== 0 && (
                    <label
                      htmlFor={questions[questionIndex].choice4}
                      className='px-2'>
                      {' '}
                      {questions[questionIndex].choice4}
                    </label>
                  )}
                </div>
                <div className='card-footer'>
                  <div className='row'>
                    <div className='col-lg-6'>
                      <button
                        id='NextButton'
                        className='btn bg-primary'
                        onClick={NextButton}>
                        Next
                      </button>
                    </div>
                    <div className='col-lg-6 align-middle'>
                      <Link
                        to='/StudentGrads'
                        className='btn bg-primary hide'
                        onClick={finishClickButton}
                        id='finish'>
                        Finish
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExamQuestion;
