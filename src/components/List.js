import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import ListItem from './ListItem';
import Placeholder from './Placeholder';

class List extends Component {
  state = {
    viewMode: 'grid'
  };

  constructor() {
    super();
    this.changeViewMode = this.changeViewMode.bind(this);
  }

  changeViewMode(mode) {
    this.setState({
      viewMode: mode
    });
  }

  render() {
    if (!Object.keys(this.props.items).length) {
      return <div className="loader" />;
    } else {
      return (
        <Fragment>
          <div className="options-bar">
            <div className="sort-setting">
              Sort by: <button className="btn">Artist</button>
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
            {Object.keys(this.props.items)
              .sort((a, b) => {
                const itemA = this.props.items[a];
                const itemB = this.props.items[b];

                const aSort = itemA.sortUnder ? itemA.sortUnder : itemA.artist;
                const bSort = itemB.sortUnder ? itemB.sortUnder : itemB.artist;

                return aSort.toLowerCase() < bSort.toLowerCase() ? -1 : 1;
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
