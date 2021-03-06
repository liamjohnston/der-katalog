import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import base from '../firebase';

import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { IMG_PATH } from '../constants';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import AccessDenied from './AccessDenied';

//duplicated from ListItem

class AddEditItem extends Component {
  constructor(props) {
    super(props);

    this.handleSaveItem = this.handleSaveItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.fetchDetails = this.fetchDetails.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleMediaConditionChange = this.handleMediaConditionChange.bind(
      this
    );
    this.handleSleeveConditionChange = this.handleSleeveConditionChange.bind(
      this
    );

    this.state = {
      loading: true,
      saving: false,
      mode: this.props.mode,
      itemId: this.props.match.params.id,
    };
  }

  //TODO: A better solution than having 3x functions!
  //Possibly can redo with native range inputs.
  //Am having trouble passing a second arg in the onChange event.

  handleRatingChange = value => {
    const deets = { ...this.state.details };
    deets.rating = value;

    this.setState({
      details: deets,
    });
  };

  handleMediaConditionChange = value => {
    const deets = { ...this.state.details };
    deets.mediaCondition = value;

    this.setState({
      details: deets,
    });
  };
  handleSleeveConditionChange = value => {
    const deets = { ...this.state.details };
    deets.sleeveCondition = value;

    this.setState({
      details: deets,
    });
  };

  changeFormat(format) {
    const deets = { ...this.state.details };
    deets.format = format;

    this.setState({
      details: deets,
    });
  }

  fetchDetails() {
    //  console.log('Fetching details of existing item...');
    base.bindToState(`items/${this.state.itemId}`, {
      context: this,
      state: 'details',
      then: () => {
        this.setState({ loading: false });
      },
    });
  }

  uploadWidget(event) {
    const timestamp = Date.now();

    window.cloudinary.openUploadWidget(
      {
        theme: 'minimal',
        cloud_name: 'diouve9dy',
        upload_preset: 'rt3fsjhm',
        multiple: false,
        folder: 'artwork',
        cropping: 'server',
        cropping_aspect_ratio: 1,
        cropping_default_selection_ratio: 1,
        cropping_coordinates_mode: 'custom',
        cropping_show_back_button: true,
        public_id: `${timestamp}`,
        resource_type: 'image',
        sources: ['local', 'image_search'],
        default_source: 'image_search',
        google_api_key: 'AIzaSyCSZIAG4DppJXAwDSW9I_bOACRmXTXkXh8',
      },
      (error, result) => {
        if (result && result[0].url) {
          const deets = { ...this.state.details };
          deets.artworkId = result[0].public_id;
          deets.artworkColor = result[0].colors[0][0];

          this.setState({
            details: deets,
          });
        }
      }
    );
  }

  handleSaveItem(event) {
    event.preventDefault();

    this.setState(
      {
        saving: true,
      },
      () => {
        const item = {
          id: this.state.itemId,
          artist: this.artist.value,
          title: this.title.value,
          sortUnder: this.sortUnder.value,
          year: this.year.value,
          country: this.country.value,
          format: this.format.value,
          notes: this.notes.value,
          artworkId: this.artworkId.value,
          artworkColor: this.artworkColor.value,
          mediaCondition: parseFloat(this.mediaCondition.value),
          sleeveCondition: parseFloat(this.sleeveCondition.value),
          rating: parseFloat(this.rating.value),
        };

        this.props.saveItem(item);
        this.props.history.push('/');
      }
    );
  }

  handleDeleteItem() {
    this.setState(
      {
        saving: true, //TODO: Change this line slash get it working
      },
      () => {
        this.props.deleteItem(this.state.itemId);
        this.props.history.push('/');
      }
    );
  }

  componentWillMount() {
    if (this.state.mode === 'edit') {
      this.fetchDetails();
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <div className="loader" />;
    } else if (!this.props.itMe) {
      return <AccessDenied />;
    } else {
      const details = this.state.details;

      const formats = ['Album', 'EP', 'Single'];

      return (
        <main role="main" className="wrapper">
          <form
            className="form add-wrap"
            ref={input => {
              this.addForm = input;
            }}
            onSubmit={this.handleSaveItem}
          >
            <ScrollToTopOnMount />
            <div className="card add-card add-form mt-3">
              <h2 className="card-title center">Details</h2>
              <label className="card-label" htmlFor="artist">
                Artist
              </label>
              <input
                id="artist"
                required
                type="text"
                className="form-field"
                defaultValue={details ? details.artist : ''}
                ref={input => {
                  this.artist = input;
                }}
              />
              <label className="card-label" htmlFor="sort-name">
                Sort name
                <br />
                <span className="muted fw-normal text-sm">(if different)</span>
              </label>
              <input
                id="sort-name"
                type="text"
                className="form-field"
                defaultValue={details ? details.sortUnder : ''}
                ref={input => {
                  this.sortUnder = input;
                }}
              />
              <label className="card-label" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                required
                type="text"
                className="form-field"
                defaultValue={details ? details.title : ''}
                ref={input => {
                  this.title = input;
                }}
              />
              <label className="card-label" htmlFor="year">
                Year
              </label>
              <input
                id="year"
                type="tel"
                className="form-field"
                defaultValue={details ? details.year : ''}
                ref={input => {
                  this.year = input;
                }}
              />
              <label className="card-label" htmlFor="country">
                Country
              </label>
              <input
                id="country"
                type="text"
                className="form-field"
                defaultValue={details ? details.country : ''}
                ref={input => {
                  this.country = input;
                }}
              />
              <label className="card-label">Format</label>
              {/* TODO: should really use radios here.
              This would also negate need for hidden field or other side-steppery */}
              <div className="split-btns split-3">
                {formats.map(format => {
                  return (
                    <button
                      type="button"
                      key={format}
                      className={`btn ${
                        details && details.format === `${format}`
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => this.changeFormat(`${format}`)}
                    >
                      {format}
                    </button>
                  );
                })}
              </div>
              <input
                type="hidden"
                defaultValue={details ? details.format : ''}
                ref={input => {
                  this.format = input;
                }}
              />

              <label className="card-label">Vinyl cond.</label>
              <div className="slider">
                <Slider
                  handleLabel={
                    details && details.mediaCondition
                      ? details.mediaCondition.toString()
                      : '0'
                  }
                  min={0}
                  max={5}
                  value={details ? details.mediaCondition : 0}
                  onChange={this.handleMediaConditionChange}
                />
                <input
                  type="hidden"
                  defaultValue={details ? details.mediaCondition : 0}
                  ref={input => {
                    this.mediaCondition = input;
                  }}
                />
              </div>
              <label className="card-label">Sleeve cond.</label>
              <div className="slider">
                <Slider
                  handleLabel={
                    details && details.sleeveCondition
                      ? details.sleeveCondition.toString()
                      : '0'
                  }
                  min={0}
                  max={5}
                  value={details ? details.sleeveCondition : 0}
                  onChange={this.handleSleeveConditionChange}
                />
                <input
                  type="hidden"
                  defaultValue={details ? details.sleeveCondition : 0}
                  ref={input => {
                    this.sleeveCondition = input;
                  }}
                />
              </div>
              <label htmlFor="artwork" className="card-label align-self-start">
                Artwork
              </label>

              {details && details.artworkId ? (
                <div className="img-wrap">
                  <img
                    src={`${IMG_PATH}c_scale,h_840,w_840,f_auto/v1/${details.artworkId}`}
                    className="w-100"
                    alt={`Album cover for ${details.title}`}
                  />
                  <button
                    type="button"
                    onClick={this.uploadWidget.bind(this)}
                    className="upload-button btn btn-primary btn-sm btn js-center"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={this.uploadWidget.bind(this)}
                    className="upload-button btn btn-primary btn-sm btn js-center"
                  >
                    Add image
                  </button>
                </div>
              )}
              <input
                type="hidden"
                defaultValue={details ? details.artworkId : ''}
                ref={input => {
                  this.artworkId = input;
                }}
              />
              <input
                type="hidden"
                defaultValue={details ? details.artworkColor : ''}
                ref={input => {
                  this.artworkColor = input;
                }}
              />
            </div>
            <div className="card add-card add-form">
              <h2 className="card-title center">My notes</h2>
              <label className="card-label">My rating</label>
              <div className="slider">
                <Slider
                  handleLabel={
                    details && details.rating ? details.rating.toString() : '0'
                  }
                  min={0}
                  max={5}
                  step={0.5}
                  value={details ? details.rating : 0}
                  onChange={this.handleRatingChange}
                />
                <input
                  type="hidden"
                  defaultValue={details ? details.rating : 0}
                  ref={input => {
                    this.rating = input;
                  }}
                />
              </div>
              <label className="card-label align-self-start" htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                className="form-field"
                rows="3"
                defaultValue={details ? details.notes : ''}
                ref={input => {
                  this.notes = input;
                }}
              />
            </div>
            {!this.state.saving ? (
              <button type="submit" className="btn btn-primary js-center">
                {this.state.mode === 'add' ? 'Add to katalog' : 'Save changes'}
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="btn btn-primary js-center"
              >
                Saving...
              </button>
            )}
            {this.state.mode === 'edit' && !this.state.saving ? (
              <button
                type="button"
                className="btn btn-sm js-center mt-2"
                onClick={() => {
                  if (window.confirm('Really? Ya sure?')) {
                    this.handleDeleteItem();
                  }
                }}
              >
                Delete
              </button>
            ) : (
              ''
            )}
          </form>
        </main>
      );
    }
  }
}

AddEditItem.propTypes = {
  mode: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  saveItem: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  deleteItem: PropTypes.func,
  itMe: PropTypes.bool,
};

export default withRouter(AddEditItem);
