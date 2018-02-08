import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//import ScrollToTopOnMount from './ScrollToTopOnMount';

import base, { auth, provider } from '../firebase';

import Header from './Header';
import AlbumList from './AlbumList';
import Detail from './Detail';
import AddEditItem from './AddEditItem';

import 'normalize.css';
import '../css/fontello.css';
import '../css/App.min.css';

class App extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.saveItem = this.saveItem.bind(this);

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
    if (!this.state.itMe) {
      alert('How did you even get here? Only Liam may edit Der Katalog.');
      return false;
    }

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

  componentDidMount() {
    base.syncState(`items`, {
      context: this,
      state: 'items'
      //WAIT!!! this sorted it but also seemed to duplicate my database when i saved one :((((
      //Be sure to comment the setState in the save function while testing this.
      // asArray: true, -CAUTION-
      // queries: {-CAUTION-
      //   orderByChild: 'artist'-CAUTION-
      // }-CAUTION-
    });

    auth.onAuthStateChanged(user => {
      if (user && user.uid === this.state.liam_uid) {
        this.setState({ user, itMe: true });
      }
    });
  }

  // componentWillUnmount() {
  //   base.removeBinding(this.ref);
  // }

  //MOVED TO HELPERS FILE. But could not use JSX, so had to dangerouslySetInnerHtml on it :/
  // renderStars(rating) {
  //   let str = [];
  //   const whole = Math.floor(rating);
  //
  //   Array.from(Array(whole), (_, i) => {
  //     return str.push(<i className="icon-star" key={i} />);
  //   });
  //
  //   if (!Number.isInteger(rating)) {
  //     str.push(<i className="icon-star-half" key={rating} />);
  //   }
  //
  //   return str;
  // }

  render() {
    return (
      <Router>
        <Fragment>
          <Header
            login={this.login}
            logout={this.logout}
            itMe={this.state.itMe}
          />
          <div className="wrapper">
            <Route
              exact
              path="/"
              render={props => (
                <AlbumList items={this.state.items} itMe={this.state.itMe} />
              )}
            />

            <Route
              path="/detail/:id"
              render={props => <Detail itMe={this.state.itMe} {...props} />}
            />

            {this.state.itMe && (
              <Route
                exact
                path="/add"
                render={props => (
                  <AddEditItem mode="add" saveItem={this.saveItem} />
                )}
              />
            )}

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
