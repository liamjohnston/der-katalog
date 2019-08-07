import React from 'react';
import PropTypes from 'prop-types';

const FormatFilter = props => {
  const { filter, changeListOption } = props;
  return (
    <div>
      <div className="filterLabel">LPs/Singles</div>
      <div className="filter-options split-btns mt-xs">
        <button
          type="button"
          className={`btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => changeListOption('filter', 'all')}
          title="Show all formats"
        >
          <i className="icon icon-cd-1" />
          <i className="icon icon-cd-2" />
        </button>
        <button
          type="button"
          className={`btn ${filter === 'albums' ? 'active' : ''}`}
          onClick={() => changeListOption('filter', 'albums')}
          title="Show only albums and EPs"
        >
          <i className="icon icon-cd-1" />
        </button>
        <button
          type="button"
          className={`btn ${filter === 'singles' ? 'active' : ''}`}
          onClick={() => changeListOption('filter', 'singles')}
          title="Show only singles"
        >
          <i className="icon icon-cd-2" />
        </button>
      </div>
    </div>
  );
};

FormatFilter.propTypes = {
  changeListOption: PropTypes.func,
  filter: PropTypes.string,
};

export default FormatFilter;
