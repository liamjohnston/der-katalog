import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  render() {
    return (
      <div className="search-wrap">
        <label>Search</label>
        <input
          id="search"
          className="form-field mt-xs"
          value={this.props.query}
          onChange={this.props.handleSearch}
          placeholder="Artist or title"
        />
      </div>
    );
  }
}
SearchBox.propTypes = {
  handleSearch: PropTypes.func,
  query: PropTypes.string
};

export default SearchBox;
