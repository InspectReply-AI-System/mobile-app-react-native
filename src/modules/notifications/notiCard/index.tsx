import React from 'react';
import { normalize } from '@inspectreplyai/utils';
import Row from '@inspectreplyai/components/general/Row';
import { Icons } from '@inspectreplyai/themes/appImages';
import { colors, typography } from '@inspectreplyai/themes';
import Column from '@inspectreplyai/components/general/Column';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { Text, StyleSheet, Image, ViewStyle, TextStyle } from 'react-native';
import AppleStyleSwipeableRow from '@inspectreplyai/components/swipableCard';

type Props = {
  heading: string;
  subLabel: string;
  description: string;
  onActionPress: () => void;
  customDescStyle?: TextStyle;
  onRightIconPress: () => void;
  customHeadingStyle?: TextStyle;
  customSubLabelStyle?: TextStyle;
  containerCustomStyle?: ViewStyle;
};
const NotiCard = (props: Props) => {
  const {
    heading,
    subLabel,
    description,
    onActionPress,
    customDescStyle,
    onRightIconPress,
    customHeadingStyle,
    customSubLabelStyle,
    containerCustomStyle,
  } = props;
  return (
    <AppleStyleSwipeableRow hideEdit leftActionHandler={onActionPress}>
      <Column style={styles.container} {...containerCustomStyle}>
        <Row style={styles.textIconContainer}>
          <Text style={[typography.body, { flex: 1 }]} {...customHeadingStyle}>
            {heading}
          </Text>
          <Touchable onPress={onRightIconPress}>
            <Image source={Icons.cross} style={styles.crossIcon} />
          </Touchable>
        </Row>
        <Text
          style={[typography.subBody1, styles.timeText]}
          {...customSubLabelStyle}>
          {subLabel}
        </Text>
        <Text
          numberOfLines={3}
          style={[typography.h6, styles.description]}
          {...customDescStyle}>
          {description}
        </Text>
      </Column>
    </AppleStyleSwipeableRow>
  );
};

export default NotiCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: normalize(10),
    paddingVertical: normalize(14),
    borderColor: colors.primaryBlue,
    paddingHorizontal: normalize(14),
    backgroundColor: colors.black27282B,
  },
  crossIcon: {
    width: normalize(12),
    height: normalize(12),
  },
  description: {
    color: colors.white,
    marginTop: normalize(16),
    lineHeight: normalize(22),
  },
  textIconContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.grey,
    marginTop: normalize(4),
  },
});
