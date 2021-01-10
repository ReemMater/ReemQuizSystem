import React, { useContext } from 'react';
//import StudentContext from '../../../context/students/studentContext';
import AuthContext from '../../../context/auth/authContext';

function StudentGradesTable() {
  const authContext = useContext(AuthContext);
  const { users } = authContext;
  return (
    <div>
      <table className='table'>
        <thead className='thead-danger'>
          <tr className='row'>
            <th className='col-3'>#</th>

            <th className='col-3'>Name</th>
            <th className='col-3'>Email</th>

            <th className='col-3'>Grade</th>
          </tr>
        </thead>
        <tbody className='table'>
          {users.map((item, index) => (
            <tr key={index} className='row'>
              <td className='col-3'>{index}</td>
              <td className='col-3'>{item.name}</td>
              <td className='col-3'>{item.email}</td>
              {item.grade === '-1' && (
                <td className='col-3'>"not Tested Yet"</td>
              )}
              {item.grade !== '-1' && <td className='col-3'>{item.grade}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default StudentGradesTable;
