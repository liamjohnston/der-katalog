import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTopOnMount from './ScrollToTopOnMount';

const About = props => {
  return (
    <main role="main" className="wrapper">
      <div className="content-wrap">
        <ScrollToTopOnMount />
        <div className="card mt-2">
          <h2 className="card-title center">About this site</h2>
          <p>I'm Liam and this is my modest record collection.</p>
          <p>
            The main reason I built this site so that when I'm out record
            shopping I can answer my own question of "do I already have this
            [probably Phil Collins] album?"
          </p>
          <p>
            As a general rule I don't buy new vinyl, because a) expensive and b)
            where's the fun in that? I like sifting through second-hand record
            stores.
          </p>
          <p>
            <Link to="/" onClick={props.resetSettings}>
              Back to Der Katalog
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
