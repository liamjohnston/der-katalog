import React, { Component } from 'react';

class FormatFilter extends Component {
  render() {
    return (
      <div className="filter-options split-btns">
        <button
          className={`btn ${this.props.filter === 'all' ? 'active' : ''}`}
          onClick={() => this.props.changeFilterMode('all')}
        >
          All
        </button>
        <button
          className={`btn ${this.props.filter === 'albums' ? 'active' : ''}`}
          onClick={() => this.props.changeFilterMode('albums')}
        >
          Albums
        </button>
        <button
          className={`btn ${this.props.filter === 'singles' ? 'active' : ''}`}
          onClick={() => this.props.changeFilterMode('singles')}
        >
          Single/EP
        </button>
      </div>
    );
  }
}

export default FormatFilter;
