/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

function StudentNav(props) {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  const onLogout = () => {
    logout();
  };

  return (
    <div>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div className='container'>
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
                  <Link to='/StudentTest' className='dropdown-item text-white'>
                    <i className='fas fa-folder text-white'></i> Exam
                  </Link>
                  <Link
                    to='/StudentGrads'
                    href='#'
                    className='dropdown-item text-white'>
                    <i className='fas fa-users text-white'></i> Grade
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

export default StudentNav;
