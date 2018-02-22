import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ViewMode extends Component {
  render() {
    return (
      <div className="list-btns al-self-flex-end">
        <div className="view-options split-btns hide-xs">
          <button
            className={`btn ${this.props.viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('viewMode', 'grid')}
            title="Layout items in a grid"
          >
            <i className="icon icon-th-large" />
          </button>
          <button
            className={`btn ${this.props.viewMode === 'list' ? 'active' : ''}`}
            onClick={() => this.props.changeListOption('viewMode', 'list')}
            title="Layout items as a list"
          >
            <i className="icon icon-list" />
          </button>
        </div>
        {this.props.itMe ? (
          <Link to="/add" className="btn btn-primary ml-1">
            Add
          </Link>
        ) : (
          ''
        )}
      </div>
    );
  }
}

ViewMode.propTypes = {
  changeListOption: PropTypes.func,
  viewMode: PropTypes.string
};

export default ViewMode;
