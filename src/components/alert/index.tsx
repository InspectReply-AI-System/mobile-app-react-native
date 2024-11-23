import { Alert } from 'react-native';

const AlertComponent = (props: {
  title: string;
  description: string;
  text1?: string;
  text2?: string;
  onPressText1?: () => void;
  onPressText2?: () => void;
}) => {
  const { title, description, text1, text2, onPressText1, onPressText2 } =
    props;

  Alert.alert(title, description, [
    {
      text: text1 || 'Cancel',
      onPress: onPressText1,
      style: 'cancel',
    },
    {
      text: text2 || 'Ok',
      onPress: onPressText2,
    },
  ]);
};

export default AlertComponent;
