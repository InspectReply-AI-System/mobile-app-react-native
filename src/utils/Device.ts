import DeviceInfo from 'react-native-device-info';

const Device = {
  getVersion: () => DeviceInfo.getVersion(),

  getBuildNumber: () => DeviceInfo.getBuildNumber(),
  isLocationEnabled: () => DeviceInfo.isLocationEnabled(),
  getDeviceId: () => DeviceInfo.getDeviceId(),
  isSimulator: () => DeviceInfo.isEmulator(),
  hasNotch: () => DeviceInfo.hasNotch(),
};
export default Device;
