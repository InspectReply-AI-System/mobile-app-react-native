// src/themes/typography.js

import { normalize } from '@inspectreplyai/utils';
import colors from './colors';
import fonts from './fonts';

const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: normalize(36),
    color: colors.white,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: normalize(24),
    color: colors.white,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: normalize(14),
    color: colors.white,
  },
  // Add more typography styles as needed
};

export default typography;
