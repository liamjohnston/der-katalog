import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import base, { auth, provider } from '../firebase';

import Header from './Header';
import AlbumList from './AlbumList';
import Detail from './Detail';
import AddEditItem from './AddEditItem';
import About from './About';

import 'normalize.css';
import '../css/fontello.css';
import '../css/App.min.css';

class App extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      items: {},
      user: null,
      liam_uid: 'zsf5lFlYrAN7sCsTsxYpoYklo9a2',
      itMe: false
    };
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null,
        itMe: false
      });
    });
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      if (user.uid !== this.state.liam_uid) {
        alert('Sorry, only Liam may edit Der Katalog.');
        return false;
      }
      this.setState({
        user,
        itMe: true
      });
    });
  }

  saveItem = item => {
    //TODO: maybe add some feedback for react-devtools hackers that they can't save,
    //because they need to be authed as ME with google.

    const items = { ...this.state.items };
    const timestamp = Date.now();

    //if new item without existing id, give it a unique id (based on timestamp)
    if (!item.id) {
      item.id = timestamp;
      items[`${timestamp}`] = item;
    } else {
      items[item.id] = item;
    }

    this.setState({ items });
  };

  deleteItem = item => {
    const items = { ...this.state.items };
    items[item] = null;
    this.setState({ items });
    //TODO: also delete corresponding artwork in Cloudinary... but also, no biggie not to
  };

  componentDidMount() {
    base.syncState(`items`, {
      context: this,
      state: 'items'
    });

    auth.onAuthStateChanged(user => {
      if (user && user.uid === this.state.liam_uid) {
        this.setState({ user, itMe: true });
      }
    });
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header
            login={this.login}
            logout={this.logout}
            itMe={this.state.itMe}
            {...this.props}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <AlbumList
                  items={this.state.items}
                  itMe={this.state.itMe}
                  query={this.props.options.query}
                  {...this.props}
                />
              )}
            />

            <Route
              path="/detail/:id"
              render={props => (
                <Detail itMe={this.state.itMe} login={this.login} {...props} />
              )}
            />

            <Route
              path="/add"
              render={props => (
                <AddEditItem
                  mode="add"
                  saveItem={this.saveItem}
                  itMe={this.state.itMe}
                />
              )}
            />

            <Route
              path="/edit/:id"
              render={props => (
                <AddEditItem
                  mode="edit"
                  saveItem={this.saveItem}
                  deleteItem={this.deleteItem}
                  itMe={this.state.itMe}
                />
              )}
            />

            <Route path="/about" component={About} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}
App.propTypes = {
  //  options: PropTypes.object
  options: PropTypes.shape({
    query: PropTypes.string
  })
};

export default App;
