import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

//import { DebounceInput } from 'react-debounce-input';

import ListItem from './ListItem';
import Placeholder from './Placeholder';

class List extends Component {
  constructor() {
    super();

    this.changeViewMode = this.changeViewMode.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      viewMode: 'grid',
      query: ''
    };
  }

  changeViewMode(mode) {
    this.setState({
      viewMode: mode
    });
  }

  handleSearch(event) {
    const val = event.target.value;
    this.setState({ query: val });
  }

  render() {
    if (!Object.keys(this.props.items).length) {
      return <div className="loader" />;
    } else {
      return (
        <Fragment>
          <div className="options-bar">
            {/* <div className="sort-setting">
              Sort by: <button className="btn">Artist</button>
            </div> */}

            <div className="search-wrap">
              {/* <DebounceInput
                className="form-field"
                minLength={2}
                debounceTimeout={300}
                onChange={event => this.setState({ value: event.target.value })}
              /> */}
              {/* <p>Value: {this.state.query}</p> */}

              <input
                id="search"
                className="form-field"
                defaultValue={this.state.query}
                onChange={this.handleSearch}
                placeholder="Artist or album"
              />
            </div>

            <div className="list-btns">
              <div className="view-options split-btns">
                <button
                  className="btn"
                  onClick={() => this.changeViewMode('grid')}
                >
                  Grid
                </button>
                <button
                  className="btn"
                  onClick={() => this.changeViewMode('list')}
                >
                  List
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
            {this.props.items
              .filter(item => {
                if (this.state.query.length < 3) {
                  return item; //return everything if insufficient search length
                } else {
                  //sufficient string length...:
                  if (
                    item.artist
                      .toLowerCase()
                      .includes(this.state.query.toLowerCase()) ||
                    item.title
                      .toLowerCase()
                      .includes(this.state.query.toLowerCase())
                  ) {
                    return item; //return filtered item only
                  }
                }
              })
              .sort((a, b) => {
                const aSort = a.sortUnder ? a.sortUnder : a.artist;
                const bSort = b.sortUnder ? b.sortUnder : b.artist;
                return aSort.toLowerCase() < bSort.toLowerCase() ? -1 : 1;
              })
              .map(key => (
                <LazyLoad
                  key={key.id}
                  height={120}
                  placeholder={<Placeholder />}
                  once
                >
                  <ListItem
                    key={key.id}
                    details={key}
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
