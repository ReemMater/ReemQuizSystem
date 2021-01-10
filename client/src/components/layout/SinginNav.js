import React from 'react';
import { Link } from 'react-router-dom';

function SinginNav() {
  return (
    <div>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            Sign In
          </Link>
          <button
            className='navbar-toggler'
            data-toggle='collapse'
            data-target='#navBar1'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div id='navBar1' className='collapse navbar-collapse'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to='/Register' className='nav-link'>
                  <i className='fas fa-sign-in-alt'></i>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SinginNav;
