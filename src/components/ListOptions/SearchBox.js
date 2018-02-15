import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  render() {
    return (
      <div>
        <label>Search</label>
        <input
          id="search"
          className="form-field mt-xs"
          defaultValue={this.props.query}
          onChange={this.props.handleSearch}
          placeholder="Artist or album"
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
