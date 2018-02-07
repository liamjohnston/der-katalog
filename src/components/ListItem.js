import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { renderStars } from '../helpers';

class ListItem extends Component {
  render() {
    const itemDetails = this.props.details;
    return (
      <li className="album-list-item" key={itemDetails.id}>
        <Link to={`/detail/${itemDetails.id}`}>
          {/* TODO: update height if list view vs grid view */}
          {itemDetails.artworkId ? (
            <CloudinaryContext cloudName="diouve9dy" className="item-thumb">
              <Image
                publicId={itemDetails.artworkId}
                alt={`Album cover for ${itemDetails.title}`}
              >
                <Transformation
                  width={this.props.viewMode === 'grid' ? 240 : 100}
                  height={this.props.viewMode === 'grid' ? 240 : 100}
                  crop="scale"
                />
              </Image>
            </CloudinaryContext>
          ) : (
            <img
              className="item-thumb"
              src={require(`../img/artwork-placeholder.png`)}
              alt={`No artwork found for ${itemDetails.title}`}
            />
          )}
          <div className="item-details">
            <div className="item-artist">{itemDetails.artist}</div>
            <div className="item-title">{itemDetails.title}</div>
            <div className="item-meta">
              <span className="item-year">{itemDetails.year}</span> &middot;{' '}
              <span className="item-format">{itemDetails.format}</span>
            </div>
            {itemDetails.rating ? (
              <div
                className="stars"
                dangerouslySetInnerHTML={{
                  __html: renderStars(itemDetails.rating)
                }}
              />
            ) : (
              <span className="muted text-sm">Not rated yet</span>
            )}
          </div>
        </Link>
      </li>
    );
  }
}

export default ListItem;
