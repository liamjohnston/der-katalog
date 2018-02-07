import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ScrollToTopOnMount from './ScrollToTopOnMount';

import base from '../firebase';

import Header from './Header';
import List from './List';
import Detail from './Detail';
import AddEditItem from './AddEditItem';

import 'normalize.css';
import '../css/App.min.css';

class App extends Component {
  state = {
    items: []
  };

  constructor() {
    super();
    this.renderStars = this.renderStars.bind(this);
  }

  saveItem = item => {
    const items = [...this.state.items];
    const timestamp = Date.now();

    //    items.find(existing => existing.id === item.id);

    //  debugger;

    //if new item without existing id, give it a unique id (based on timestamp)
    // if (!item.id) {
    //   item.id = timestamp;
    //   items[`${timestamp}`] = item;
    // } else {
    //   items[item.id] = item;
    // }

    //debugger;

    if (item.id && items.find(existing => existing.id === item.id)) {
      const index = items.findIndex(existing => existing.id === item.id);
      items[index] = item;
    } else {
      item.id = timestamp;
      items[`${timestamp}`] = item;
      //items.push(item);
    }

    //debugger;
    this.setState({ items });

    //history.push('/');
    //    this.props.history.push('/');
  };

  componentWillMount() {
    base.syncState(`items`, {
      context: this,
      state: 'items',
      //WAIT!!! this sorted it but also seemed to duplicate my database when i saved one :((((
      asArray: true,
      queries: {
        orderByChild: 'artist'
      }
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  renderStars(rating) {
    let str = [];
    const whole = Math.floor(rating);

    Array.from(Array(whole), (_, i) => {
      return str.push(<i className="icon-star" key={i} />);
    });

    if (!Number.isInteger(rating)) {
      str.push(<i className="icon-star-half" key={rating} />);
    }

    return str;
  }

  render() {
    //    debugger;
    return (
      <Router>
        <Fragment>
          <Header />
          <div className="wrapper">
            <ScrollToTopOnMount />
            <Route
              exact
              path="/"
              render={props => (
                <List {...this.state} renderStars={this.renderStars} />
              )}
            />

            <Route path="/detail/:id" component={Detail} />

            <Route
              exact
              path="/add"
              render={props => (
                <AddEditItem mode="add" saveItem={this.saveItem} />
              )}
            />

            <Route
              path="/edit/:id"
              render={props => (
                <AddEditItem mode="edit" saveItem={this.saveItem} />
              )}
            />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
