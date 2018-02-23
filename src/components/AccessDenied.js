import React from 'react';

const AccessDenied = () => {
  return (
    <div className="add-form add-wrap detail-wrap">
      <div className="card add-card detail-card">
        <h3 className="card-title center">ACCESS DENIED</h3>
        <img
          src={require(`../img/get-out.jpg`)}
          className="get-out"
          alt="GET OUT"
        />
      </div>
    </div>
  );
};

export default AccessDenied;
