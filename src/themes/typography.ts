// src/themes/typography.js

import { normalize } from '@inspectreplyai/utils';
import colors from './colors';
import fonts from './fonts';

const typography = {
  h1: {
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(36),
    color: colors.white,
  },
  h2: {
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(24),
    color: colors.white,
  },
  h3: {
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(22),
    color: colors.white,
  },
  h4: {
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(20),
    color: colors.white,
  },
  h5: {
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(18),
    color: colors.white,
  },
  h6: {
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(16),
    color: colors.white,
  },
  body: {
    fontFamily: fonts.REGULAR,
    fontSize: normalize(14),
    color: colors.white,
  },
  // Add more typography styles as needed
};

export default typography;
