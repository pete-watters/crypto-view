import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';

const Error = ({ onRetryClick }) =>
  <Layout>
    <section className="error-page">
      <h3>Oh no - error! </h3>
      <article className="needle">
        <div className="base" />
        <div className="lines">
          <div className="vertical" />
          <div className="horizontal" />
        </div>
      </article>
      <article className="disk-wrapper">
        <div className="disk">
          <div className="half-circle-top" />
          <div className="half-circle-bottom" />
          <div className="separator" />
          <div className="inner-circle">
            <span>4</span>
            <div className="dot" />
            <span>4</span>
          </div>
        </div>
      </article>
      <button onClick={onRetryClick}>Retry</button>
    </section>
  </Layout>;

Error.propTypes = {
  onRetryClick: PropTypes.func.isRequired,
};

export default memo(Error);
