import React, { Component } from 'react';

class SortOptions extends Component {
  render() {
    return (
      <div>
        <label>Sort by</label>
        <div className="sort-options split-btns mt-xs">
          <button
            className={`btn ${this.props.sortBy === 'artist' ? 'active' : ''}`}
            onClick={() => this.props.changeSortMode('artist')}
          >
            <i className="icon icon-sort-alphabet" />
          </button>
          <button
            className={`btn ${this.props.sortBy === 'year' ? 'active' : ''}`}
            onClick={() => this.props.changeSortMode('year')}
          >
            <i className="icon icon-calendar" />
          </button>
          <button
            className={`btn ${this.props.sortBy === 'rating' ? 'active' : ''}`}
            onClick={() => this.props.changeSortMode('rating')}
          >
            <i className="icon icon-star" />
          </button>
        </div>
      </div>
    );
  }
}

export default SortOptions;
