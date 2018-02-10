import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderStars } from '../helpers';

const IMG_PATH = '//res.cloudinary.com/diouve9dy/image/upload/';

class ListItem extends Component {
  render() {
    const itemDetails = this.props.details;
    const img_size = this.props.viewMode === 'grid' ? 240 : 100;
    return (
      <li className="album-list-item" key={itemDetails.id}>
        <Link to={`/detail/${itemDetails.id}`}>
          {itemDetails.artworkId ? (
            <img
              src={`${IMG_PATH}c_scale,h_${img_size},w_${img_size}/v1/${
                itemDetails.artworkId
              }`}
              className="item-thumb"
              alt={`Album cover for ${itemDetails.title}`}
            />
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
              <div className="muted text-sm nowrap">Not rated yet</div>
            )}
          </div>
        </Link>
      </li>
    );
  }
}

export default ListItem;
