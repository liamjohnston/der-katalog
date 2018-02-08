import React, { Component } from 'react';

class SortOptions extends Component {
  render() {
    return (
      <div className="sort-options split-btns">
        <button
          className={`btn ${this.props.sortBy === 'artist' ? 'active' : ''}`}
          onClick={() => this.props.changeSortMode('artist')}
        >
          Artist
        </button>
        <button
          className={`btn ${this.props.sortBy === 'year' ? 'active' : ''}`}
          onClick={() => this.props.changeSortMode('year')}
        >
          Year
        </button>
        <button
          className={`btn ${this.props.sortBy === 'rating' ? 'active' : ''}`}
          onClick={() => this.props.changeSortMode('rating')}
        >
          Rating
        </button>
      </div>
    );
  }
}

export default SortOptions;
