import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { renderStars } from '../helpers';
import base from '../firebase';

import ScrollToTopOnMount from './ScrollToTopOnMount';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {}
    };
  }

  componentDidMount() {
    const item = this.props.match.params.id;
    base.bindToState(`items/${item}`, {
      context: this,
      state: 'details'
    });
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
              {details.artist} - {details.title}
              {details.rating <= 0 ? (
                <div className="muted text-sm fw-normal mt-1">
                  Not rated yet
                </div>
              ) : (
                <div
                  className="stars card-value text-huge mt-1"
                  dangerouslySetInnerHTML={{
                    __html: renderStars(details.rating)
                  }}
                />
              )}
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
                  <div
                    className="stars card-value"
                    dangerouslySetInnerHTML={{
                      __html: renderStars(details.mediaCondition)
                    }}
                  />
                ) : (
                  <span className="muted">-</span>
                )}{' '}
              </div>
              <div>
                <div className="mb-s">Sleeve:</div>
                {details.sleeveCondition ? (
                  <div
                    className="stars card-value"
                    dangerouslySetInnerHTML={{
                      __html: renderStars(details.sleeveCondition)
                    }}
                  />
                ) : (
                  <span className="muted">-</span>
                )}
              </div>
            </div>
            {details.notes ? (
              <Fragment>
                <label className="card-label align-self-start">Notes:</label>
                <div className="detail-notes card-value">{details.notes}</div>
              </Fragment>
            ) : (
              ''
            )}
          </div>

          {this.props.itMe ? (
            <Link
              to={`/edit/${details.id}`}
              className="btn btn-primary js-center mb-2"
            >
              Edit details
            </Link>
          ) : (
            ''
          )}
        </div>
      );
    }
  }
}

export default Detail;
