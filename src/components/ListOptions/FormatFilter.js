import React, { Component } from 'react';

class FormatFilter extends Component {
  render() {
    return (
      <div>
        <label>Formats</label>
        <div className="filter-options split-btns mt-xs">
          <button
            className={`btn ${this.props.filter === 'all' ? 'active' : ''}`}
            onClick={() => this.props.changeFilterMode('all')}
          >
            <i className="icon icon-cd-1" />
            <i className="icon icon-cd-2" />
          </button>
          <button
            className={`btn ${this.props.filter === 'albums' ? 'active' : ''}`}
            onClick={() => this.props.changeFilterMode('albums')}
          >
            <i className="icon icon-cd-1" />
          </button>
          <button
            className={`btn ${this.props.filter === 'singles' ? 'active' : ''}`}
            onClick={() => this.props.changeFilterMode('singles')}
          >
            <i className="icon icon-cd-2" />
          </button>
        </div>
      </div>
    );
  }
}

export default FormatFilter;
