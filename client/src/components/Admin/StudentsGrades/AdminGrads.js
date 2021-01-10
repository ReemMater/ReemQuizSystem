import React, { useContext, useEffect } from 'react';
import AdminNav from '../AdminNav';

import StudentGradesTable from './StudentGradesTable';
import AuthContext from '../../../context/auth/authContext';
function AdminGrads() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AdminNav />

      <section className='py-4 my-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div
                  className='card-header bg-danger'
                  style={{ boxShadow: '1px 3px 5px #333' }}>
                  <h4>Students grades</h4>
                </div>
                <div className='card-body'>
                  <StudentGradesTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminGrads;
