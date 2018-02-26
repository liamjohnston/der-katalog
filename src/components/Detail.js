import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { renderStars, shadeBlend } from '../helpers';
import firebase from 'firebase';

import ScrollToTopOnMount from './ScrollToTopOnMount';

//duplicated from ListItem
//NOTE, I am not using CloudinaryContext due to it blocking rendering
//and making the whole page fail to load on mobile :///
const IMG_PATH = '//res.cloudinary.com/diouve9dy/image/upload/';

const imgLoadingStyles = {
  opacity: 0.4
};

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {},
      isLoading: true,
      imgLoaded: false
    };

    this.setColor = this.setColor.bind(this);
    this.setImgLoaded = this.setImgLoaded.bind(this);
  }

  setColor(color = '#eeeeee') {
    document.body.style.backgroundImage = `
      linear-gradient(
        ${color},
        ${shadeBlend(0.3, color)}
      )
    `;
  }
  setImgLoaded() {
    this.setState({ imgLoaded: true });
  }

  componentWillMount() {
    const item = this.props.match.params.id;

    this.itemRef = firebase.database().ref(`items/${item}`);

    this.itemRef.on('value', snapshot => {
      let item = snapshot.val();

      this.setState({
        details: item,
        isLoading: false
      });
    });
  }

  componentWillUnmount() {
    this.itemRef.off();
    document.body.style.removeProperty('background-image');
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="wrapper">
          <div className="loader" />
        </div>
      );
    } else {
      const details = this.state.details;
      this.setColor(details.artworkColor);
      return (
        <div className="wrapper detail-super-wrap">
          <div className="detail-wrap">
            <ScrollToTopOnMount />

            {details.artworkId ? (
              <div
                className="detail-image"
                style={this.state.imgLoaded ? {} : imgLoadingStyles}
              >
                <img
                  src={`${IMG_PATH}c_scale,h_800,w_800,f_auto/v1/${
                    details.artworkId
                  }`}
                  alt={`Album cover for ${details.title}`}
                  onLoad={() => {
                    this.setImgLoaded();
                  }}
                />
              </div>
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

              {this.props.itMe ? (
                <Link
                  to={`/edit/${details.id}`}
                  className="btn btn-primary js-center mb-2 mt-2 col-span-all"
                >
                  Edit details
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  itMe: PropTypes.bool
};

export default Detail;
