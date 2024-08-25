const fixedPath = '../assets';

import UnselectedCheckBox from '../assets/svg/checkBoxIcon.svg';
import SelectCheckBox from '../assets/svg/checkBoxSelectionIcon.svg';
import checked from '../assets/svg/checked.svg';
import one from '../assets/svg/one.svg';
import two from '../assets/svg/two.svg';
import connector from '../assets/svg/Connector.svg';

export const Icons = {
  backIcon: require(`${fixedPath}/icons/backButton.png`),
  reports: require(`${fixedPath}/icons/reports.png`),
  contractors: require(`${fixedPath}/icons/contractors.png`),
  notifications: require(`${fixedPath}/icons/notifications.png`),
  profile: require(`${fixedPath}/icons/profile.png`),
};

export const Images = {
  appIcon: require(`${fixedPath}/images/appIcon.png`),
};

export const GIF = {
  //   example: require(`${fixedPath}json/example.json`),
};

export const SvgIcon = {
  SelectCheckBox,
  UnselectedCheckBox,
  checked,
  one,
  two,
  connector,
};
