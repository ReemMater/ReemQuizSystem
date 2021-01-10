/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import SinginNav from '../layout/SinginNav';
import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

function SignIn(props) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { login, error, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/StudentTest');
    } else if (error === 'invalid User' || error === 'invalid password') {
      setAlert(error, 'danger');
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@exam.com' && password === 'admin') {
      props.history.push('/AdminGrads');
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div>
      <SinginNav />
      <Alerts />
      <section onSubmit={onSubmit} className='py-4 mb-4'>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-md-6 mb-3 mx-auto'>
              <div className='card'>
                <div className='card-header'>
                  <h4>
                    Account <span className='text-primary'>Login</span>
                  </h4>
                </div>
                <div className='card-body'>
                  <form>
                    <div className='form-group'>
                      <input
                        type='email'
                        name='email'
                        className='form-control'
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='password'
                        name='password'
                        className='form-control'
                        placeholder='Enter Password'
                        value={password}
                        onChange={onChange}
                        required
                        autoComplete='true'
                      />
                    </div>
                    <input
                      className='btn bg-primary btn-block'
                      type='submit'
                      value='Login'
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default SignIn;
