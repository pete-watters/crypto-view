import React, { memo } from 'react';
import Layout from './Layout';

const Error = () =>
  <Layout>
    <section className="error-page">
      <h3>Oh no - error! </h3>
      <article className="needle-wrapper">
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
    </section>
  </Layout>;

export default memo(Error);
