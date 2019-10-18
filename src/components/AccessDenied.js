import React from 'react';
import getOutImg from '../img/get-out.jpg';

const AccessDenied = () => {
  return (
    <div className="add-form add-wrap detail-wrap">
      <div className="card add-card detail-card">
        <h2 className="card-title center">ACCESS DENIED</h2>
        <img src={getOutImg} className="get-out" alt="GET OUT" />
      </div>
    </div>
  );
};

export default AccessDenied;
