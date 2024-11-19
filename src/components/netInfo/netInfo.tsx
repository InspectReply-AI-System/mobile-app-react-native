import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';
import Column from '../general/Column';
import { NetInfoProps } from './@types';
import LocalImage from '../general/LocalImage';
import PrimaryButton from '../buttons/primaryButton';
import { CommonStrings, vh } from '@inspectreplyai/utils';
import { Images, SvgIcon } from '@inspectreplyai/themes/appImages';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const NetInfoScreen = ({ onPressRetry }: NetInfoProps) => {
  const inset = useSafeAreaInsets();

  return (
    <Column style={styles.container}>
      <Column
        style={[styles.centerContainer, { marginTop: vh(inset.top + 50) }]}>
        <LocalImage source={Images.appIcon} style={styles.image} />
        <Column style={styles.iconContainer}>
          <SvgIcon.Wifi />
        </Column>
        <Text style={styles.errorText}>{CommonStrings.connectionError}</Text>
      </Column>
      <Column
        style={[
          styles.buttonContainer,
          {
            marginBottom: vh(inset.bottom + 69),
          },
        ]}>
        <PrimaryButton onPress={onPressRetry} title={CommonStrings.retry} />
      </Column>
    </Column>
  );
};
