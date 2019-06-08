import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import firebase from 'firebase';
import { renderStars, shadeBlend } from '../helpers';
import placeholder from '../img/artwork-placeholder.png';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { IMG_PATH } from '../constants';

const imgLoadingStyles = {
  opacity: 0.4,
};

function setColor(color = '#eeeeee') {
  document.body.style.backgroundImage = `
    linear-gradient(
      ${color},
      ${shadeBlend(0.3, color)}
    )
  `;
}

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {},
      isLoading: true,
      imgLoaded: false,
    };

    this.setImgLoaded = this.setImgLoaded.bind(this);
  }

  componentWillMount() {
    const item = this.props.match.params.id;

    this.itemRef = firebase.database().ref(`items/${item}`);

    this.itemRef.on('value', snapshot => {
      const item = snapshot.val();

      this.setState({
        details: item,
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.itemRef.off();
    document.body.style.removeProperty('background-image');
  }

  setImgLoaded() {
    this.setState({ imgLoaded: true });
  }

  render() {
    const { isLoading, imgLoaded, details } = this.state;
    const { itMe, login } = this.props;

    if (isLoading) {
      return (
        <div className="wrapper">
          <div className="loader" />
        </div>
      );
    }
    setColor(details.artworkColor);
    return (
      <div className="wrapper detail-super-wrap">
        <div className="detail-wrap">
          <ScrollToTopOnMount />

          {details.artworkId ? (
            <div
              className="detail-image"
              style={imgLoaded ? {} : imgLoadingStyles}
            >
              <img
                src={`${IMG_PATH}c_scale,h_840,w_840,f_auto/v1/${details.artworkId}`}
                alt={`Album cover for ${details.title}`}
                onLoad={() => {
                  this.setImgLoaded();
                }}
              />
            </div>
          ) : (
            <div className="detail-image">
              <img
                src={placeholder}
                alt={`No artwork found for ${details.title}`}
              />
            </div>
          )}

          <div
            className={`card detail-card main-detail ${
              details.artworkId && !imgLoaded ? 'imgNotLoaded' : ''
            }`}
          >
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
                    __html: renderStars(details.rating),
                  }}
                />
              )}
            </h3>

            <div>
              {details.format} &middot; {details.year} &middot;{' '}
              {details.country}
            </div>

            <div className="card-value card-value-split2">
              <div>
                <div className="mb-s">Vinyl condition:</div>
                {details.mediaCondition ? (
                  <div
                    className="stars card-value"
                    dangerouslySetInnerHTML={{
                      __html: renderStars(details.mediaCondition),
                    }}
                  />
                ) : (
                  <span className="muted">-</span>
                )}{' '}
              </div>
              <div>
                <div className="mb-s">Sleeve condition:</div>
                {details.sleeveCondition ? (
                  <div
                    className="stars card-value"
                    dangerouslySetInnerHTML={{
                      __html: renderStars(details.sleeveCondition),
                    }}
                  />
                ) : (
                  <span className="muted">-</span>
                )}
              </div>
            </div>
            {details.notes ? (
              <Fragment>
                {/* <label className="card-label align-self-start">Notes:</label> */}
                <div className="detail-notes card-value">{details.notes}</div>
              </Fragment>
            ) : (
              ''
            )}

            {itMe ? (
              <Link
                to={`/edit/${details.id}`}
                className="btn btn-primary js-center mb-2 mt-2 col-span-all"
              >
                Edit details
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-primary js-center mb-2 mt-2 col-span-all"
                onClick={login}
              >
                Log in to edit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  itMe: PropTypes.bool,
};

export default Detail;
