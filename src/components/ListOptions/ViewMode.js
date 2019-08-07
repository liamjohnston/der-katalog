import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ViewMode = props => {
  const { viewMode, changeListOption, itMe } = props;
  return (
    <div className="list-btns al-self-flex-end">
      <div className="view-options split-btns hide-xs">
        <button
          type="button"
          className={`btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => changeListOption('viewMode', 'grid')}
          title="Layout items in a grid"
        >
          <i className="icon icon-th-large" />
        </button>
        <button
          type="button"
          className={`btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => changeListOption('viewMode', 'list')}
          title="Layout items as a list"
        >
          <i className="icon icon-list" />
        </button>
      </div>
      {itMe ? (
        <Link to="/add" className="btn btn-primary ml-1">
          Add
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};

ViewMode.propTypes = {
  changeListOption: PropTypes.func,
  viewMode: PropTypes.string,
  itMe: PropTypes.bool,
};

export default ViewMode;
