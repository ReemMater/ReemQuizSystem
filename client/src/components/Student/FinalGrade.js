import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import QuestionContext from '../../context/questions/questionContext';

function FinalGrade() {
  const authContext = useContext(AuthContext);
  const questionContext = useContext(QuestionContext);
  const { loadQuestions, questions } = questionContext;
  useEffect(() => {
    authContext.loadUser();
    loadQuestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let user = {};
  if (authContext.user) {
    user = authContext.user;
  } else {
    user.grade = '..';
  }

  return (
    <div>
      <section className='py-4 my-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              {(user.grade !== '-1' && user.grade !== '..' && (
                <div className='card' style={{ boxShadow: '1px 3px 5px #333' }}>
                  <div
                    className={
                      'card-header bg-' +
                      (user.grade > 50 ? 'primary' : 'danger')
                    }>
                    {user.grade > 50 ? (
                      <h4>Congratulation You pass the Exam</h4>
                    ) : (
                      <h4>Sorry You Fail</h4>
                    )}
                  </div>
                  <div className='card-body'>
                    <p>Your grade is : {user.grade}</p>
                  </div>
                </div>
              )) ||
                (user.grade === '..' && (
                  <div
                    className='card'
                    style={{ boxShadow: '1px 3px 5px #333' }}>
                    <div className='card-header bg-light'>
                      <h4>Loading..</h4>
                    </div>
                    <div className='card-body'>
                      <p>Your grade is : {user.grade}</p>
                    </div>
                  </div>
                )) ||
                (user.grade === '-1' && (
                  <div
                    className='card'
                    style={{ boxShadow: '1px 3px 5px #333' }}>
                    <div className='card-header bg-danger'>
                      <h4>You Must Do This Quiz As soon As Posible</h4>
                    </div>
                    <div className='card-body'>
                      <p>Good Luck</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      {user.grade !== '-1' && (
        <div className='container'>
          <h1>Correct Answer</h1>
        </div>
      )}
      {user.grade !== '-1' &&
        questions.map((item, index) => (
          <div className='container'>
            <div className='card border-danger col-6'>
              <h6>{item.questiontext}</h6>
              <p>
                {item.correct === 'A'
                  ? item.choice1
                  : item.correct === 'B'
                  ? item.choice2
                  : item.correct === 'C'
                  ? item.choice3
                  : item.choice4}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FinalGrade;
