import React from 'react';

const ListItemPlaceholder = props => {
  return (
    <li className="album-list-item-placeholder">
      <div className="item-thumb">
      </div>
      <div className="item-details">
        <div className="placeholder-info" />
        <div className="placeholder-info" />
        <div className="placeholder-info" />
      </div>
    </li>
  );
};

export default ListItemPlaceholder;
