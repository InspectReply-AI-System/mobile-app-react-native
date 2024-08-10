// src/themes/typography.js

import colors from './colors';
import fonts from './fonts';

const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: colors.text,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
  },
  // Add more typography styles as needed
};

export default typography;
