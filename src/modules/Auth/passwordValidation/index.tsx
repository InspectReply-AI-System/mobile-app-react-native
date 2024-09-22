import React from 'react';
import styles from './styles';
import { FlatList, Text } from 'react-native';
import { PasswordValidationData } from './data';
import Row from '@inspectreplyai/components/general/Row';
import Svg from '@inspectreplyai/components/general/Svg';
import check from '@inspectreplyai/assets/svg/check.svg';
import { colors, typography } from '@inspectreplyai/themes';
import Column from '@inspectreplyai/components/general/Column';
import { CommonStrings, normalize } from '@inspectreplyai/utils';

const PasswordValidation = (props: { value: string }) => {
  const { value } = props;

  const renderItem = ({ item }: any) => {
    return (
      <Column>
        <Row style={styles.renderSubContainer}>
          {item.checked ? (
            <Svg Component={check} style={styles.imageStyle} />
          ) : (
            <Column style={styles.uncheckedView} />
          )}
          <Text
            style={[
              styles.textStyle,
              {
                color: item.checked ? colors.white : colors.red,
              },
            ]}>
            {item.label}
          </Text>
        </Row>
      </Column>
    );
  };

  return (
    <Column>
      <Text style={[typography.h5, { marginTop: normalize(27) }]}>
        {CommonStrings.requirements}
      </Text>
      <FlatList
        renderItem={renderItem}
        data={PasswordValidationData(value)}
        contentContainerStyle={styles.contentContainer}
      />
    </Column>
  );
};

export default PasswordValidation;
