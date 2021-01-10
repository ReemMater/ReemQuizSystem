import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './components/pages/SignIn';
import RegisterPage from './components/pages/RegisterPage';
import AdminQuestions from './components/Admin/AdminQuestions/AdminQuestions';
import AdminGrads from './components/Admin/StudentsGrades/AdminGrads';
import StudentTest from './components/Student/StudentTest';
import StudentGrads from './components/Student/StudentGrads';

import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertStete';
import QuestionState from './context/questions/QuestionState';
//import StudentState from './context/students/StudentState';

import setAuthToken from './utilts/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AlertState>
      <AuthState>
        <QuestionState>
          <Router>
            <Fragment>
              <Switch>
                <PrivateRoute exact path='/' component={SignIn} />
                <Route
                  exact
                  path='/AdminQuestions'
                  component={AdminQuestions}
                />
                <Route exact path='/AdminGrads' component={AdminGrads} />
                <Route exact path='/StudentTest' component={StudentTest} />
                <Route exact path='/StudentGrads' component={StudentGrads} />
                <Route exact path='/Register' component={RegisterPage} />
              </Switch>
            </Fragment>
          </Router>
        </QuestionState>
      </AuthState>
    </AlertState>
  );
};

export default App;
