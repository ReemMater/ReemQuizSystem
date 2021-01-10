import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
export const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className='container' key={alert.id}>
        <div
          className={`card bg-${alert.type} border-dark text-center`}
          key={alert.id}
          style={{ boxShadow: '1px 3px 5px #333' }}>
          <i className='fas fa-info-circle'></i>
          {alert.msg}
        </div>
      </div>
    ))
  );
};

export default Alerts;
