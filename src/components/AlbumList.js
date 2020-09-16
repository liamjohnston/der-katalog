import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';
import SearchBox from './ListOptions/SearchBox';
import FormatFilter from './ListOptions/FormatFilter';
import SortOptions from './ListOptions/SortOptions';
import ViewMode from './ListOptions/ViewMode';
import Footer from './Footer';

function scrollTop() {
  window.scrollTo(0, 0);
}
class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.changeListOption = this.changeListOption.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.appplyFiltersAndWhatnot = this.appplyFiltersAndWhatnot.bind(this);
    this.updateFilterState = this.updateFilterState.bind(this);

    this.state = {
      filterIDs: [],
    };
  }

  // called when navigating back:
  componentDidMount() {
    this.appplyFiltersAndWhatnot();
  }

  // not called when navigating back:
  componentDidUpdate(previousProps, previousState) {
    const { items, options, query } = this.props;

    // we have items for the first time: apply the IDs to state
    if (previousProps.items !== items) {
      const completeListIDs = Object.keys(items);
      this.setState(
        {
          filterIDs: completeListIDs,
        },
        () => {
          this.appplyFiltersAndWhatnot();
        }
      );
    }

    // if the options/search changes, update the list of applicable IDs in state
    if (previousProps.options !== options || previousProps.query !== query) {
      this.appplyFiltersAndWhatnot();
    }
  }

  changeListOption(option, settings) {
    const { viewMode, sortItems, filterItems } = this.props;

    // yuck...
    if (option === 'viewMode') {
      viewMode(settings);
    } else if (option === 'sortBy') {
      sortItems(settings);
    } else if (option === 'filter') {
      filterItems(settings);
    }

    scrollTop();
  }

  handleSearch(event) {
    const { searchItems } = this.props;
    const val = event.target.value;
    searchItems(val);
    scrollTop();
  }

  updateFilterState(list) {
    this.setState({
      filterIDs: list,
    });
  }

  appplyFiltersAndWhatnot() {
    const { options, items } = this.props;
    const { query, sortBy, filter } = options;

    const newFilterIDs = Object.keys(items)
      .filter((item) => {
        const thisOne = items[item];
        // return everything if insufficient search length
        if (query.length < 2) {
          return thisOne;
        }
        if (
          thisOne.artist.toLowerCase().includes(query.toLowerCase()) ||
          thisOne.title.toLowerCase().includes(query.toLowerCase())
        ) {
          return thisOne;
        }
        return false;
      })
      .filter((item) => {
        const thisOne = items[item];
        if (filter === 'albums') {
          return thisOne.format === 'Album' ? thisOne : false;
        }
        if (filter === 'singles') {
          return thisOne.format === 'Single' || thisOne.format === 'EP'
            ? thisOne
            : false;
        }
        return item;
      })
      .sort((a, b) => {
        const itemA = items[a];
        const itemB = items[b];

        if (sortBy.sortBy === 'year') {
          if (sortBy.ascDesc === 'asc') {
            return itemA.year < itemB.year ? 1 : -1;
          }
          return itemA.year < itemB.year ? -1 : 1;
        }
        if (sortBy.sortBy === 'rating') {
          if (sortBy.ascDesc === 'asc') {
            return itemA.rating < itemB.rating ? 1 : -1;
          }
          return itemA.rating < itemB.rating ? -1 : 1;
        }
        const aSort = itemA.sortUnder ? itemA.sortUnder : itemA.artist;
        const bSort = itemB.sortUnder ? itemB.sortUnder : itemB.artist;
        if (sortBy.ascDesc === 'asc') {
          return aSort.toLowerCase() < bSort.toLowerCase() ? -1 : 1;
        }
        return aSort.toLowerCase() < bSort.toLowerCase() ? 1 : -1;
      });

    this.updateFilterState(newFilterIDs);
  }

  render() {
    const { options, itMe, items, renderStars } = this.props;
    const { viewMode, query, sortBy, filter } = options;
    const { filterIDs } = this.state;

    if (!Object.keys(items).length) {
      return <div className="loader" />;
    }
    return (
      <main role="main" className="wrapper">
        <div className="options-bar mt-2 mb-2">
          <SearchBox query={query} handleSearch={this.handleSearch} />

          <SortOptions
            sortBy={sortBy}
            changeListOption={this.changeListOption}
          />

          <FormatFilter
            filter={filter}
            changeListOption={this.changeListOption}
          />

          <ViewMode
            viewMode={viewMode}
            changeListOption={this.changeListOption}
            itMe={itMe}
          />
        </div>

        {/* searching and results */}
        {filterIDs.length && options.query.length >= 2 ? (
          <div className="results-msg">
            {filterIDs.length}{' '}
            {options.filter !== 'all'
              ? `${options.filter} containing`
              : 'results for'}{' '}
            <strong>"{options.query}"</strong>
          </div>
        ) : (
          ''
        )}

        {/* searching and NO results */}
        {!filterIDs.length && options.query.length >= 2 ? (
          <div className="no-results-msg">
            No{' '}
            {options.filter !== 'all'
              ? `${options.filter} containing`
              : 'results for'}{' '}
            <strong>"{options.query}"</strong>
          </div>
        ) : (
          ''
        )}

        <ul className={`album-list ${viewMode}-mode`}>
          {filterIDs.map((key) => {
            return (
              <ListItem
                query={query}
                key={key}
                details={items[key]}
                renderStars={renderStars}
                viewMode={viewMode}
              />
            );
          })}
        </ul>
        <Footer />
      </main>
    );
  }
}

AlbumList.propTypes = {
  viewMode: PropTypes.func,
  sortItems: PropTypes.func,
  filterItems: PropTypes.func,
  searchItems: PropTypes.func,
  items: PropTypes.object,
  options: PropTypes.object,
  itMe: PropTypes.bool,
  renderStars: PropTypes.func,
};

export default AlbumList;
