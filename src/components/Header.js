import React, { memo } from 'react';
import { CRYPTO_VIEW } from 'constants/';

export const Header = () =>
  <header>
    <figure>
      <svg viewBox="0 0 200 200">
        <path d="M65.9 100.2c0 13.1 3.6 23.6 10.7 31.4 6.7 7.1 15.9 10.7 30.2 10.7 10.9 0 19-1.7 25.4-5.2v-16.4c-8.6 3.8-16.9 6-25 6-15.9 0-23.3-8.3-23.3-26.4 0-18.3 7.8-27.1 24-27.1 5.5 0 12.1 1.7 20 5l6.7-15.2c-8.1-3.8-17.1-5.7-27.1-5.7-12.6 0-22.8 3.6-30.7 11.4-7.1 7-10.9 17.5-10.9 31.5zM10 190h180V10H10v180zM0 200V0h200v200H0z" />
      </svg>
      <figcaption><h1>{CRYPTO_VIEW.COPY.LOGO}</h1></figcaption>
    </figure>
  </header>;

export default memo(Header);
