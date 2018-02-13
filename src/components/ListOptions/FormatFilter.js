import React, { Component } from 'react';

class FormatFilter extends Component {
  render() {
    return (
      <div>
        <label>LPs/Singles</label>
        <div className="filter-options split-btns mt-xs">
          <button
            className={`btn ${this.props.filter === 'all' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('filter', 'all')}
          >
            <i className="icon icon-cd-1" />
            <i className="icon icon-cd-2" />
          </button>
          <button
            className={`btn ${this.props.filter === 'albums' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('filter', 'albums')}
          >
            <i className="icon icon-cd-1" />
          </button>
          <button
            className={`btn ${this.props.filter === 'singles' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('filter', 'singles')}
          >
            <i className="icon icon-cd-2" />
          </button>
        </div>
      </div>
    );
  }
}

export default FormatFilter;
