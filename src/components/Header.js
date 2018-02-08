import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <div className="title-bar">
          <div className="header-title">
            <Link to="/">
              <svg width="220px" viewBox="0 0 435 35">
                <g
                  id="svgGroup"
                  strokeLinecap="round"
                  fillRule="evenodd"
                  fontSize="9pt"
                  stroke="#000"
                  strokeWidth="0.25mm"
                  fill="none"
                  style={{
                    stroke: 'none',
                    strokeWidth: '0.25mm',
                    fill: '#e91e63'
                  }}
                >
                  <path
                    d="M 435 35 L 410 35 L 410 30 L 405 30 L 405 25 L 400 25 L 400 10 L 405 10 L 405 5 L 410 5 L 410 0 L 435 0 L 435 5 L 415 5 L 415 10 L 410 10 L 410 25 L 415 25 L 415 30 L 425 30 L 425 20 L 420 20 L 420 15 L 435 15 L 435 35 Z M 75 35 L 40 35 L 40 0 L 75 0 L 75 5 L 50 5 L 50 15 L 70 15 L 70 20 L 50 20 L 50 30 L 75 30 L 75 35 Z M 170 35 L 160 35 L 160 0 L 170 0 L 170 15 L 175 15 L 175 10 L 180 10 L 180 5 L 185 5 L 185 0 L 195 0 L 195 5 L 190 5 L 190 10 L 185 10 L 185 15 L 180 15 L 180 20 L 185 20 L 185 25 L 190 25 L 190 30 L 195 30 L 195 35 L 180 35 L 180 30 L 175 30 L 175 25 L 170 25 L 170 35 Z M 90 35 L 80 35 L 80 0 L 110 0 L 110 5 L 115 5 L 115 20 L 105 20 L 105 25 L 110 25 L 110 30 L 115 30 L 115 35 L 100 35 L 100 30 L 95 30 L 95 25 L 90 25 L 90 35 Z M 210 35 L 200 35 L 200 10 L 205 10 L 205 5 L 210 5 L 210 0 L 225 0 L 225 5 L 230 5 L 230 10 L 235 10 L 235 35 L 225 35 L 225 25 L 210 25 L 210 35 Z M 290 35 L 280 35 L 280 10 L 285 10 L 285 5 L 290 5 L 290 0 L 305 0 L 305 5 L 310 5 L 310 10 L 315 10 L 315 35 L 305 35 L 305 25 L 290 25 L 290 35 Z M 390 35 L 365 35 L 365 30 L 360 30 L 360 5 L 365 5 L 365 0 L 390 0 L 390 5 L 395 5 L 395 30 L 390 30 L 390 35 Z M 25 35 L 0 35 L 0 0 L 25 0 L 25 5 L 30 5 L 30 10 L 35 10 L 35 25 L 30 25 L 30 30 L 25 30 L 25 35 Z M 265 35 L 255 35 L 255 5 L 245 5 L 245 0 L 275 0 L 275 5 L 265 5 L 265 35 Z M 355 35 L 325 35 L 325 0 L 335 0 L 335 30 L 355 30 L 355 35 Z M 10 5 L 10 30 L 20 30 L 20 25 L 25 25 L 25 10 L 20 10 L 20 5 L 10 5 Z M 370 5 L 370 30 L 385 30 L 385 5 L 370 5 Z M 290 10 L 290 20 L 305 20 L 305 10 L 300 10 L 300 5 L 295 5 L 295 10 L 290 10 Z M 90 5 L 90 20 L 100 20 L 100 15 L 105 15 L 105 5 L 90 5 Z M 210 10 L 210 20 L 225 20 L 225 10 L 220 10 L 220 5 L 215 5 L 215 10 L 210 10 Z"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </svg>
            </Link>
          </div>
          {this.props.itMe ? (
            <button
              className="header-auth-link btn"
              onClick={this.props.logout}
            >
              Log out
            </button>
          ) : (
            <button className="header-auth-link btn" onClick={this.props.login}>
              Log in
            </button>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
