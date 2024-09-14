const fixedPath = '../assets';

import UnselectedCheckBox from '../assets/svg/checkBoxIcon.svg';
import SelectCheckBox from '../assets/svg/checkBoxSelectionIcon.svg';
import checked from '../assets/svg/checked.svg';
import one from '../assets/svg/one.svg';
import two from '../assets/svg/two.svg';
import connector from '../assets/svg/Connector.svg';
import Success from '@inspectreplyai/assets/svg/success.svg';
import Cross from '@inspectreplyai/assets/svg/cross.svg';
import Erorr from '@inspectreplyai/assets/svg/error.svg';
import Info from '@inspectreplyai/assets/svg/info.svg';
import eye from '@inspectreplyai/assets/svg/eye.svg';

export const Icons = {
  backIcon: require(`${fixedPath}/icons/backButton.png`),
  reports: require(`${fixedPath}/icons/reports.png`),
  contractors: require(`${fixedPath}/icons/contractors.png`),
  notifications: require(`${fixedPath}/icons/notifications.png`),
  profile: require(`${fixedPath}/icons/profile.png`),
  loader: require(`${fixedPath}/icons/loader.png`),
  cross: require(`${fixedPath}/icons/cross.png`),
  edit: require(`${fixedPath}/icons/edit.png`),
  bin: require(`${fixedPath}/icons/bin.png`),
};

export const Images = {
  appIcon: require(`${fixedPath}/images/appIcon.png`),
  redInfo: require(`${fixedPath}/images/redInfo.png`),
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
  Success,
  Cross,
  Erorr,
  Info,
  eye,
};
