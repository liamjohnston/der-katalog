import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SortOptions extends Component {
  render() {
    return (
      <div>
        <label>Sort by</label>
        <div className="sort-options split-btns mt-xs">
          <button
            className={`btn ${
              this.props.sortBy.sortBy === 'artist' ? 'active' : ''
            } sort_${this.props.sortBy.ascDesc}`}
            onClick={() =>
              this.props.changeListOption('sortBy', {
                sortBy: 'artist',
                ascDesc:
                  this.props.sortBy.sortBy === 'artist' &&
                  this.props.sortBy.ascDesc === 'asc'
                    ? 'desc'
                    : 'asc'
              })
            }
            title="Sort by artist, ascending or descending"
          >
            <i className="icon icon-sort-alphabet" />
          </button>
          <button
            className={`btn ${
              this.props.sortBy.sortBy === 'year' ? 'active' : ''
            } sort_${this.props.sortBy.ascDesc}`}
            onClick={() =>
              this.props.changeListOption('sortBy', {
                sortBy: 'year',
                ascDesc:
                  this.props.sortBy.sortBy === 'year' &&
                  this.props.sortBy.ascDesc === 'asc'
                    ? 'desc'
                    : 'asc'
              })
            }
            title="Sort by year, ascending or descending"
          >
            <i className="icon icon-calendar" />
          </button>
          <button
            className={`btn ${
              this.props.sortBy.sortBy === 'rating' ? 'active' : ''
            } sort_${this.props.sortBy.ascDesc}`}
            onClick={() =>
              this.props.changeListOption('sortBy', {
                sortBy: 'rating',
                ascDesc:
                  this.props.sortBy.sortBy === 'rating' &&
                  this.props.sortBy.ascDesc === 'asc'
                    ? 'desc'
                    : 'asc'
              })
            }
            title="Sort by rating, ascending or descending"
          >
            <i className="icon icon-star" />
          </button>
        </div>
      </div>
    );
  }
}

SortOptions.propTypes = {
  changeListOption: PropTypes.func,
  //sortBy: PropTypes.string
  sortBy: PropTypes.shape({
    sortBy: PropTypes.string,
    ascDesc: PropTypes.string
  })
};

export default SortOptions;
