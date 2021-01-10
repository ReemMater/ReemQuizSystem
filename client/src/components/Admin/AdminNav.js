/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
function AdminNav() {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const onLogout = () => {
    logout();
  };
  return (
    <div>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div className='container'>
          <a className='navbar-brand'>Admin</a>
          <button
            className='navbar-toggler'
            data-toggle='collapse'
            data-target='#navBar1'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div id='navBar1' className='collapse navbar-collapse'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item dropdown'>
                <a className='nav-link dropdown-toggle' data-toggle='dropdown'>
                  <i className='fas fa-user'> Welcome</i>
                </a>
                <div className='dropdown-menu bg-dark'>
                  <Link
                    className='dropdown-item text-white'
                    to='/AdminQuestions'>
                    <i className='fas fa-folder text-white'></i> Exam
                  </Link>
                  <Link className='dropdown-item text-white' to='/AdminGrads'>
                    <i className='fas fa-users text-white'></i> Students
                  </Link>
                </div>
              </li>
              <li className='nav-item'>
                <a onClick={onLogout} href='/' className='nav-link'>
                  <i className='fas fa-sign-in-alt'></i>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNav;
