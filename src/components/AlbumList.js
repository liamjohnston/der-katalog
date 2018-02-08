import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad, { forceCheck } from 'react-lazyload';

//import { DebounceInput } from 'react-debounce-input';

import ListItem from './ListItem';
import Placeholder from './Placeholder';
import SearchBox from './ListOptions/SearchBox';
import FormatFilter from './ListOptions/FormatFilter';
import SortOptions from './ListOptions/SortOptions';

class List extends Component {
  constructor() {
    super();

    this.changeViewMode = this.changeViewMode.bind(this);
    this.changeSortMode = this.changeSortMode.bind(this);
    this.changeFilterMode = this.changeFilterMode.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      viewMode: 'grid',
      query: '',
      sortBy: 'artist',
      filter: 'all'
    };
  }

  changeViewMode(mode) {
    this.setState({
      viewMode: mode
    });
  }

  changeSortMode(mode) {
    this.setState({
      sortBy: mode
    });
  }

  changeFilterMode(mode) {
    this.setState({
      filter: mode
    });
  }

  handleSearch(event) {
    const val = event.target.value;
    this.setState({ query: val });
  }

  componentDidUpdate() {
    //forces LazyLoad to check if placeholders need rendering,
    //e.g. if a sort/filter/search has taken place but no scrolling happened
    forceCheck();
  }

  render() {
    if (!Object.keys(this.props.items).length) {
      return <div className="loader" />;
    } else {
      return (
        <Fragment>
          <div className="options-bar mt-1 mb-1">
            <div className="search-wrap">
              {/* TODO: debounce search */}
              {/* <DebounceInput
                className="form-field"
                minLength={2}
                debounceTimeout={300}
                onChange={event => this.setState({ value: event.target.value })}
              /> */}
              {/* <p>Value: {this.state.query}</p> */}

              <SearchBox
                query={this.state.query}
                handleSearch={this.handleSearch}
              />
            </div>

            <SortOptions
              sortBy={this.state.sortBy}
              changeSortMode={this.changeSortMode}
            />

            <FormatFilter
              filter={this.state.filter}
              changeFilterMode={this.changeFilterMode}
            />

            <div className="list-btns">
              <div className="view-options split-btns">
                <button
                  className={`btn ${
                    this.state.viewMode === 'grid' ? 'active' : ''
                  }`}
                  onClick={() => this.changeViewMode('grid')}
                >
                  <i className="icon-th-large" />
                </button>
                <button
                  className={`btn ${
                    this.state.viewMode === 'list' ? 'active' : ''
                  }`}
                  onClick={() => this.changeViewMode('list')}
                >
                  <i className="icon-list" />
                </button>
              </div>
              {this.props.itMe ? (
                <Link to="/add" className="btn btn-success ml-1">
                  + Add
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
          <ul className={`album-list ${this.state.viewMode}-mode`}>
            {Object.keys(this.props.items)
              .filter(item => {
                const thisOne = this.props.items[item];
                //return everything if insufficient search length
                if (this.state.query.length < 3) {
                  return thisOne;
                } else {
                  if (
                    thisOne.artist
                      .toLowerCase()
                      .includes(this.state.query.toLowerCase()) ||
                    thisOne.title
                      .toLowerCase()
                      .includes(this.state.query.toLowerCase())
                  ) {
                    return thisOne;
                  }
                }
              })
              .filter(item => {
                const thisOne = this.props.items[item];
                if (this.state.filter === 'albums') {
                  return thisOne.format === 'Album' ? thisOne : false;
                } else if (this.state.filter === 'singles') {
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

                if (this.state.sortBy === 'year') {
                  return itemA.year < itemB.year ? -1 : 1;
                } else if (this.state.sortBy === 'rating') {
                  return itemA.rating < itemB.rating ? 1 : -1;
                } else {
                  const aSort = itemA.sortUnder
                    ? itemA.sortUnder
                    : itemA.artist;
                  const bSort = itemB.sortUnder
                    ? itemB.sortUnder
                    : itemB.artist;
                  return aSort.toLowerCase() < bSort.toLowerCase() ? -1 : 1;
                }
              })
              .map(key => (
                <LazyLoad
                  key={key}
                  height={120}
                  placeholder={<Placeholder />}
                  once
                >
                  <ListItem
                    key={key}
                    details={this.props.items[key]}
                    renderStars={this.props.renderStars}
                    viewMode={this.state.viewMode}
                  />
                </LazyLoad>
              ))}
          </ul>
        </Fragment>
      );
    }
  }
}

export default List;
