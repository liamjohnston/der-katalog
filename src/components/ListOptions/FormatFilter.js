import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormatFilter extends Component {
  render() {
    return (
      <div>
        <label>LPs/Singles</label>
        <div className="filter-options split-btns mt-xs">
          <button
            className={`btn ${this.props.filter === 'all' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('filter', 'all')}
            title="Show all formats"
          >
            <i className="icon icon-cd-1" />
            <i className="icon icon-cd-2" />
          </button>
          <button
            className={`btn ${this.props.filter === 'albums' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('filter', 'albums')}
            title="Show only albums and EPs"
          >
            <i className="icon icon-cd-1" />
          </button>
          <button
            className={`btn ${this.props.filter === 'singles' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('filter', 'singles')}
            title="Show only singles"
          >
            <i className="icon icon-cd-2" />
          </button>
        </div>
      </div>
    );
  }
}

FormatFilter.propTypes = {
  changeListOption: PropTypes.func,
  filter: PropTypes.string
};

export default FormatFilter;
