import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CRYPTO_VIEW } from 'constants';
import * as error from 'styles/components/_error.scss';
import Layout from './Layout';

const Error = ({ onRetryClick }) =>
  <Layout>
    <section className={error.errorPage}>
      <h3>{CRYPTO_VIEW.COPY.ERROR.TEXT}</h3>
      <article className={error.needle}>
        <div className={error.base} />
        <div className={error.lines}>
          <div className={error.vertical} />
          <div className={error.horizontal} />
        </div>
      </article>
      <article className={error.diskWrapper}>
        <div className={error.disk}>
          <div className={error.halfCircleTop} />
          <div className={error.halfCircleBottom} />
          <div className={error.separator} />
          <div className={error.innerCircle}>
            <span>{CRYPTO_VIEW.COPY.ERROR.CODE}</span>
            <div className={error.dot} />
            <span>{CRYPTO_VIEW.COPY.ERROR.CODE}</span>
          </div>
        </div>
      </article>
      <button onClick={onRetryClick}>{CRYPTO_VIEW.COPY.ERROR.RETRY}</button>
    </section>
  </Layout>;

Error.propTypes = {
  onRetryClick: PropTypes.func.isRequired,
};

export default memo(Error);
