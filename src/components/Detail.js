import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//uncomment if I end up with albums saved without a artworkColor (shouldn't happen tho)
//have uninstaled huery for now.
// import image from 'get-image-data';
// import dominant from 'huey/dominant';

import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { renderStars, shadeBlend } from '../helpers';
import firebase from 'firebase';

import ScrollToTopOnMount from './ScrollToTopOnMount';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {},
      isLoading: true
    };

    this.setColor = this.setColor.bind(this);

    //uncomment if I end up with albums saved without a artworkColor (shouldn't happen tho)
    // this.setAndSaveColorIfImgButNoColor = this.setAndSaveColorIfImgButNoColor.bind(
    //   this
    // );
  }

  setColor(color = '#eeeeee') {
    document.body.style.background = `
      linear-gradient(
        ${color},
        ${shadeBlend(0.3, color)}
      )
    `;
  }

  //uncomment if I end up with albums saved without a artworkColor (shouldn't happen tho)
  //only called when existing image loads...
  //...and only does stuff if there isn't a colour already saved:
  // setAndSaveColorIfImgButNoColor() {
  //   if (!this.state.details.artworkColor) {
  //     image(`${IMG_PATH}${this.state.details.artworkId}`, (error, img) => {
  //       const color = `rgb(${dominant(img.data)})`;
  //
  //       const deets = { ...this.state.details };
  //       deets.artworkColor = color;
  //
  //       this.setState({
  //         details: deets
  //       });
  //
  //       console.log(`${this.state.details.title} color: ${deets.artworkColor}`);
  //     });
  //   }
  // }

  componentWillMount() {
    const item = this.props.match.params.id;
    //uncomment i f I end up with albums saved without a artworkColor (shouldn't happen tho)
    //I.E. change bindToState to syncState
    //base.syncState(`items/${item}`, {
    // base.syncState(`items/${item}`, {
    //   context: this,
    //   state: 'details'
    // });

    this.itemRef = firebase.database().ref(`items/${item}`);

    this.itemRef.on('value', snapshot => {
      let item = snapshot.val();

      this.setState(
        {
          details: item
        },
        () => {
          this.setState({ isLoading: false });
        }
      );
    });
  }

  componentWillUnmount() {
    this.itemRef.off();
    document.body.style.removeProperty('background');
  }

  render() {
    if (this.state.isLoading) {
      return <div className="loader" />;
    } else {
      const details = this.state.details;
      this.setColor(details.artworkColor);
      return (
        <div className="wrapper detail-super-wrap">
          <div className="detail-wrap">
            <ScrollToTopOnMount />

            {details.artworkId ? (
              <CloudinaryContext cloudName="diouve9dy" className="detail-image">
                {/* uncomment i f I end up with albums saved without a artworkColor (shouldn't happen tho) */}
                {/* onLoad={this.setAndSaveColorIfImgButNoColor} */}
                <Image
                  publicId={details.artworkId}
                  alt={`Album cover for ${details.title}`}
                >
                  <Transformation
                    fetch-format="auto"
                    width="800"
                    height="800"
                    crop="scale"
                  />
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
