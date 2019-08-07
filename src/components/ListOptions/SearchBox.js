import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = props => {
  const { query, handleSearch } = props;

  return (
    <div className="search-wrap">
      <div className="filterLabel">Search</div>
      <input
        id="search"
        className="form-field mt-xs"
        value={query}
        onChange={handleSearch}
        placeholder="Artist or title"
      />
    </div>
  );
};

SearchBox.propTypes = {
  handleSearch: PropTypes.func,
  query: PropTypes.string,
};

export default SearchBox;
