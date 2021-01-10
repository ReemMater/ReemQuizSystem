/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import AlartContext from '../../context/alert/alertContext';

import Alerts from '../layout/Alerts';
import RegisterNav from '../layout/RegisterNav';

function RegisterPage(props) {
  const authContext = useContext(AuthContext);
  const alartContext = useContext(AlartContext);

  const { register, clearErrors, error, isAuthenticated } = authContext;

  const { setAlert } = alartContext;

  useEffect(() => {
    if (isAuthenticated) {
      //direct to student test page
      props.history.push('/StudentTest');
    } else if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Two Passwords MUST be Identical', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <div>
      <RegisterNav />
      <Alerts />
      <section onSubmit={onSubmit} className='py-4 mb-4'>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-md-6 mb-3 mx-auto'>
              <div className='card'>
                <div className='card-header'>
                  <h4>
                    <span className='text-primary'>Registeration</span> Form
                  </h4>
                </div>
                <div className='card-body'>
                  <form>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='name'
                        className='form-control'
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={onChange}
                        required
                      />
                    </div>

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
                        minLength='6'
                        autoComplete='true'
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='password'
                        name='password2'
                        className='form-control'
                        placeholder='Confirm Password'
                        value={password2}
                        onChange={onChange}
                        required
                        autoComplete='true'
                      />
                    </div>

                    <input
                      className='btn bg-primary btn-block'
                      type='submit'
                      value='Register'
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
export default RegisterPage;
