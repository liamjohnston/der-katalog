import React from 'react';
import PropTypes from 'prop-types';

const SortOptions = props => {
  const { sortBy, changeListOption } = props;
  return (
    <div>
      <div className="filterLabel">Sort by</div>
      <div className="sort-options split-btns mt-xs">
        <button
          type="button"
          className={`btn ${sortBy.sortBy === 'artist' ? 'active' : ''} sort_${
            sortBy.ascDesc
          }`}
          onClick={() =>
            changeListOption('sortBy', {
              sortBy: 'artist',
              ascDesc:
                sortBy.sortBy === 'artist' && sortBy.ascDesc === 'asc'
                  ? 'desc'
                  : 'asc',
            })
          }
          title="Sort by artist, ascending or descending"
        >
          <i className="icon icon-sort-alphabet" />
        </button>
        <button
          type="button"
          className={`btn ${sortBy.sortBy === 'year' ? 'active' : ''} sort_${
            sortBy.ascDesc
          }`}
          onClick={() =>
            changeListOption('sortBy', {
              sortBy: 'year',
              ascDesc:
                sortBy.sortBy === 'year' && sortBy.ascDesc === 'asc'
                  ? 'desc'
                  : 'asc',
            })
          }
          title="Sort by year, ascending or descending"
        >
          <i className="icon icon-calendar" />
        </button>
        <button
          type="button"
          className={`btn ${sortBy.sortBy === 'rating' ? 'active' : ''} sort_${
            sortBy.ascDesc
          }`}
          onClick={() =>
            changeListOption('sortBy', {
              sortBy: 'rating',
              ascDesc:
                sortBy.sortBy === 'rating' && sortBy.ascDesc === 'asc'
                  ? 'desc'
                  : 'asc',
            })
          }
          title="Sort by rating, ascending or descending"
        >
          <i className="icon icon-star" />
        </button>
      </div>
    </div>
  );
};

SortOptions.propTypes = {
  changeListOption: PropTypes.func,
  // sortBy: PropTypes.string
  sortBy: PropTypes.shape({
    sortBy: PropTypes.string,
    ascDesc: PropTypes.string,
  }),
};

export default SortOptions;
