import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';

import base from '../firebase';

import ScrollToTopOnMount from './ScrollToTopOnMount';

class Detail extends Component {
  constructor() {
    super();

    this.state = {
      details: {}
    };
  }

  componentDidMount() {
    const item = this.props.match.params.id;
    base.bindToState(`items/${item}`, {
      context: this,
      state: 'details'
      //  asArray: true
    });
  }

  //seems to break going back to list view
  // componentWillUnmount() {
  //   base.removeBinding(this.ref);
  // }

  /* temporarily duplicating this while i figure out how to pass both params AND prop functions via Route */
  renderStars(rating) {
    let str = [];
    const whole = Math.floor(rating);

    Array.from(Array(whole), (_, i) => {
      return str.push(<i className="icon-star" key={i} />);
    });

    ///...why is this backwards?
    if (!Number.isInteger(rating)) {
      str.push(<i className="icon-star-half" key={rating} />);
    }

    return str;
  }

  render() {
    if (!Object.keys(this.state.details).length) {
      return <div className="loader" />;
    } else {
      const details = this.state.details;
      return (
        <div className="detail-wrap">
          <ScrollToTopOnMount />

          {details.artworkId ? (
            <CloudinaryContext cloudName="diouve9dy" className="detail-image">
              <Image
                publicId={details.artworkId}
                alt={`Album cover for ${details.title}`}
              >
                <Transformation width="800" height="800" crop="scale" />
              </Image>
            </CloudinaryContext>
          ) : (
            <div className="detail-image">
              <img
                src={require(`../img/artwork-placeholder.png`)}
                alt={`No artwork found for ${details.title}`}
              />
            </div>
          )}

          <div className="card detail-card main-detail">
            <h3 className="card-title center">
              {details.artist}, {details.title}
            </h3>
            <label className="card-label">Year:</label>
            <div className="detail-year card-value">{details.year}</div>
            <label className="card-label">Format:</label>
            <div className="detail-format card-value">{details.format}</div>
            <label className="card-label">Country:</label>
            <div className="detail-countey card-value">{details.country}</div>
            <label className="card-label align-self-start">Condition:</label>
            <div className="card-value vard-value-split2">
              <div>
                <div className="mb-s">Vinyl:</div>
                {details.mediaCondition ? (
                  <span className="stars">
                    {this.renderStars(details.mediaCondition)}
                  </span>
                ) : (
                  <span className="muted">-</span>
                )}{' '}
              </div>
              <div>
                <div className="mb-s">Sleeve:</div>
                {details.sleeveCondition ? (
                  <span className="stars">
                    {this.renderStars(details.sleeveCondition)}
                  </span>
                ) : (
                  <span className="muted">-</span>
                )}
              </div>
            </div>
          </div>
          <div className="card detail-card">
            <h3 className="card-title center">My notes</h3>
            <label className="card-label">Notes:</label>
            <div className="detail-year card-value">
              {details.notes || <span className="muted">No notes</span>}
            </div>
            <label className="card-label">My rating:</label>
            <div className="stars card-value">
              {this.renderStars(details.rating)}
            </div>
          </div>
          {/* TODO: maybe move edit to header, swap out with list view options as needed */}
          <Link
            to={`/edit/${details.id}`}
            className="btn btn-primary js-center"
          >
            Edit
          </Link>
        </div>
      );
    }
  }
}

export default Detail;
