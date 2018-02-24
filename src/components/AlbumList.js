import React, { Component } from 'react';
import LazyLoad, { forceCheck } from 'react-lazyload';
import PropTypes from 'prop-types';

import ListItem from './ListItem';
import Placeholder from './Placeholder';
import SearchBox from './ListOptions/SearchBox';
import FormatFilter from './ListOptions/FormatFilter';
import SortOptions from './ListOptions/SortOptions';
import ViewMode from './ListOptions/ViewMode';
import Footer from './Footer';

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.changeListOption = this.changeListOption.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.appplyFiltersAndWhatnot = this.appplyFiltersAndWhatnot.bind(this);
    this.updateFilterState = this.updateFilterState.bind(this);

    this.state = {
      filterIDs: []
    };
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  changeListOption(option, settings) {
    //yuck...
    if (option === 'viewMode') {
      this.props.viewMode(settings);
    } else if (option === 'sortBy') {
      this.props.sortItems(settings);
    } else if (option === 'filter') {
      this.props.filterItems(settings);
    }

    this.scrollTop();
  }

  handleSearch(event) {
    const val = event.target.value;
    this.props.searchItems(val);
    this.scrollTop();
  }

  updateFilterState(list) {
    this.setState({
      filterIDs: list
    });
  }

  appplyFiltersAndWhatnot() {
    const { query, sortBy, filter } = this.props.options;

    const newFilterIDs = Object.keys(this.props.items)
      .filter(item => {
        const thisOne = this.props.items[item];
        //return everything if insufficient search length
        if (query.length < 2) {
          return thisOne;
        } else {
          if (
            thisOne.artist.toLowerCase().includes(query.toLowerCase()) ||
            thisOne.title.toLowerCase().includes(query.toLowerCase())
          ) {
            return thisOne;
          }
          return false;
        }
      })
      .filter(item => {
        const thisOne = this.props.items[item];
        if (filter === 'albums') {
          return thisOne.format === 'Album' ? thisOne : false;
        } else if (filter === 'singles') {
          return thisOne.format === 'Single' || thisOne.format === 'EP'
            ? thisOne
            : false;
        } else {
          return item;
        }
      })
      .sort((a, b) => {
        const itemA = this.props.items[a];
        const itemB = this.props.items[b];

        if (sortBy.sortBy === 'year') {
          if (sortBy.ascDesc === 'asc') {
            return itemA.year < itemB.year ? 1 : -1;
          } else {
            return itemA.year < itemB.year ? -1 : 1;
          }
        } else if (sortBy.sortBy === 'rating') {
          if (sortBy.ascDesc === 'asc') {
            return itemA.rating < itemB.rating ? 1 : -1;
          } else {
            return itemA.rating < itemB.rating ? -1 : 1;
          }
        } else {
          const aSort = itemA.sortUnder ? itemA.sortUnder : itemA.artist;
          const bSort = itemB.sortUnder ? itemB.sortUnder : itemB.artist;
          if (sortBy.ascDesc === 'asc') {
            return aSort.toLowerCase() < bSort.toLowerCase() ? -1 : 1;
          } else {
            return aSort.toLowerCase() < bSort.toLowerCase() ? 1 : -1;
          }
        }
      });

    this.updateFilterState(newFilterIDs);
  }

  //called when navigating back:
  componentDidMount() {
    this.appplyFiltersAndWhatnot();
  }

  //not called when navigating back:
  componentDidUpdate(previousProps, previousState) {
    //forces LazyLoad to check if placeholders need rendering,
    //e.g. if a sort/filter/search has taken place but no scrolling happened
    forceCheck();

    //we have items for the first time: apply the IDs to state
    if (previousProps.items !== this.props.items) {
      const completeListIDs = Object.keys(this.props.items);
      this.setState({
        filterIDs: completeListIDs
      });
    }

    //if the options/search changes, update the list of applicable IDs in state
    if (
      previousProps.options !== this.props.options ||
      previousProps.query !== this.props.query
    ) {
      this.appplyFiltersAndWhatnot();
    }
  }

  render() {
    if (!Object.keys(this.props.items).length) {
      return <div className="loader" />;
    } else {
      const { viewMode, query, sortBy, filter } = this.props.options;
      return (
        <div className="wrapper">
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
              itMe={this.props.itMe}
            />
          </div>

          {/* searching and results */}
          {this.state.filterIDs.length &&
          this.props.options.query.length >= 2 ? (
            <div className="results-msg">
              {this.state.filterIDs.length}{' '}
              {this.props.options.filter !== 'all'
                ? `${this.props.options.filter} containing`
                : 'results for'}{' '}
              <strong>"{this.props.options.query}"</strong>
            </div>
          ) : (
            ''
          )}

          {/* searching and NO results */}
          {!this.state.filterIDs.length &&
          this.props.options.query.length >= 2 ? (
            <div className="no-results-msg">
              No{' '}
              {this.props.options.filter !== 'all'
                ? `${this.props.options.filter} containing`
                : 'results for'}{' '}
              <strong>"{this.props.options.query}"</strong>
            </div>
          ) : (
            ''
          )}

          <ul className={`album-list ${viewMode}-mode`}>
            {this.state.filterIDs.map(key => {
              return (
                <LazyLoad
                  key={key}
                  height={120}
                  placeholder={<Placeholder />}
                  offset={100}
                  resize={true}
                >
                  <ListItem
                    key={key}
                    details={this.props.items[key]}
                    renderStars={this.props.renderStars}
                    viewMode={viewMode}
                  />
                </LazyLoad>
              );
            })}
          </ul>
          <Footer />
        </div>
      );
    }
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
  renderStars: PropTypes.func
};

export default AlbumList;
