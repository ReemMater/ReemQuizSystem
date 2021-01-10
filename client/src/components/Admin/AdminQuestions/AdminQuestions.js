import React, { Fragment } from 'react';
import QuestionsPage from './QuestionsPage';
import QuestionForm from './QuestionForm';
import AdminNav from '../AdminNav';

const AdminQuestions = () => {
  return (
    <Fragment>
      <AdminNav />
      <div className='container'>
        <div className='grid-2'>
          <div>
            <QuestionForm />
          </div>
          <div>
            <QuestionsPage />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminQuestions;
