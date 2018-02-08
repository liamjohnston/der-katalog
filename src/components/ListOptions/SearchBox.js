import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <input
        id="search"
        className="form-field"
        defaultValue={this.props.query}
        onChange={this.props.handleSearch}
        placeholder="Artist or album"
      />
    );
  }
}

export default SearchBox;
