import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { renderStars } from '../helpers';
import { IMG_PATH } from '../constants';
import placeholder from '../img/artwork-placeholder.png';

function highlighter(text, query) {
  if (query.length >= 2 && text.toLowerCase().includes(query.toLowerCase())) {
    const reg = new RegExp(query, 'gi');
    const higlighted = text.replace(reg, q => {
      return `<span class="highlight">${q}</span>`;
    });
    return { __html: higlighted };
  }
  return { __html: text };
}
const ListItem = props => {
  const { details, viewMode, query } = props;
  const imgSize = viewMode === 'grid' ? 240 : 100;

  const img = `${IMG_PATH}c_scale,h_${imgSize},w_${imgSize},f_auto/v1/${details.artworkId}`;

  return (
    <li className="album-list-item" key={details.id}>
      <Link to={{ pathname: `/detail/${details.id}`, fallbackImg: img }}>
        {details.artworkId ? (
          <img
            src={img}
            style={{ backgroundColor: details.artworkColor }}
            className="item-thumb"
            alt={`Album cover for ${details.title}`}
          />
        ) : (
          <img
            className="item-thumb"
            src={placeholder}
            alt={`No artwork found for ${details.title}`}
          />
        )}
        <div className="item-details">
          <div
            className="item-artist"
            dangerouslySetInnerHTML={highlighter(details.artist, query)}
          />
          <div
            className="item-title"
            dangerouslySetInnerHTML={highlighter(details.title, query)}
          />
          {details.rating ? (
            <div
              className="stars nowrap"
              dangerouslySetInnerHTML={{
                __html: renderStars(details.rating),
              }}
            />
          ) : (
            <div className="muted text-sm nowrap">Not rated yet</div>
          )}
          <div className="item-meta nowrap">
            <span className="item-year">{details.year}</span>
            {details.format !== 'Album' ? (
              <>
                {' '}
                &middot; <span className="item-format">{details.format}</span>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

ListItem.propTypes = {
  details: PropTypes.object,
  viewMode: PropTypes.string.isRequired,
  query: PropTypes.string,
};

export default ListItem;
