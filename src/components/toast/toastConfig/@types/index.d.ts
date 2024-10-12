import { ImageSourcePropType } from 'react-native';

export interface ActivityProps {
  props: {
    label: string;
    rightLabel: string;
    description: string;
    icon: ImageSourcePropType;
  };
}

export interface TomatoProps {
  props: {
    label: string;
    description: string;
  };
}
