import React, { Component } from 'react';

class SortOptions extends Component {
  render() {
    return (
      <div>
        <label>Sort by</label>
        <div className="sort-options split-btns mt-xs">
          <button
            className={`btn ${this.props.sortBy === 'artist' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('sortBy', 'artist')}
          >
            <i className="icon icon-sort-alphabet" />
          </button>
          <button
            className={`btn ${this.props.sortBy === 'year' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('sortBy', 'year')}
          >
            <i className="icon icon-calendar" />
          </button>
          <button
            className={`btn ${this.props.sortBy === 'rating' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('sortBy', 'rating')}
          >
            <i className="icon icon-star" />
          </button>
        </div>
      </div>
    );
  }
}

export default SortOptions;
