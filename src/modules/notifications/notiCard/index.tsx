import React from 'react';
import styles from './styles';
import { Text } from 'react-native';
import { NotiCardProps } from './@types';
import { typography } from '@inspectreplyai/themes';
import Row from '@inspectreplyai/components/general/Row';
import { Icons } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import Touchable from '@inspectreplyai/components/general/Touchable';
import AppleStyleSwipeableRow from '@inspectreplyai/components/swipableCard';

const NotiCard = (props: NotiCardProps) => {
  const {
    heading,
    subLabel,
    onPressCard,
    onActionPress,
    onRightIconPress,
    customHeadingStyle,
    customSubLabelStyle,
    containerCustomStyle,
  } = props;
  return (
    <AppleStyleSwipeableRow hideEdit leftActionHandler={onActionPress}>
      <Touchable activeOpacity={0.8} onPress={onPressCard}>
        <Column style={styles.container} {...containerCustomStyle}>
          <Row style={styles.textIconContainer}>
            <Text style={[typography.body, { flex: 1 }, customHeadingStyle]}>
              {heading}
            </Text>
            <Touchable onPress={onRightIconPress}>
              <ImageWrapper source={Icons.cross} style={styles.crossIcon} />
            </Touchable>
          </Row>
          <Text
            style={[typography.subBody1, styles.timeText]}
            {...customSubLabelStyle}>
            {subLabel}
          </Text>
        </Column>
      </Touchable>
    </AppleStyleSwipeableRow>
  );
};

export default NotiCard;
