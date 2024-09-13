declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL: string;
    HOSTNAME?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
