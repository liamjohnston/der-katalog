import React, { Component } from 'react';
import firebase from 'firebase';
import ScrollToTopOnMount from './ScrollToTopOnMount';

class Random extends Component {
  componentWillMount() {
    const { history } = this.props;

    this.dbRef = firebase.database().ref('/items');
    this.dbRef.on('value', snapshot => {
      const dbState = snapshot.val();
      const dbIds = Array.from(Object.keys(dbState));
      const randomId = dbIds[Math.floor(Math.random() * dbIds.length)];
      history.push(`detail/${randomId}`);
    });
  }

  componentWillUnmount() {
    this.dbRef.off();
  }

  render() {
    return (
      <div className="wrapper detail-super-wrap">
        <ScrollToTopOnMount />
        <div className="randomise-loading">
          <i className="icon icon-shuffle" />
        </div>
      </div>
    );
  }
}

export default Random;
