/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import StudentNav from './StudentNav';

import ExamQuestion from './ExamQuestion';

import AuthContext from '../../context/auth/authContext';

function StudentTest(props) {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div>
      <StudentNav />

      <ExamQuestion />
    </div>
  );
}

export default StudentTest;
