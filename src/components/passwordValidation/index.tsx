import React from 'react';
import styles from './styles';
import { FlatList, Text } from 'react-native';
import { PasswordValidationData } from './data';
import Row from '@inspectreplyai/components/general/Row';
import Svg from '@inspectreplyai/components/general/Svg';
import check from '@inspectreplyai/assets/svg/check.svg';
import { fonts, typography } from '@inspectreplyai/themes';
import Column from '@inspectreplyai/components/general/Column';
import { CommonStrings, normalize } from '@inspectreplyai/utils';

const PasswordValidation = (props: { value: string }) => {
  const { value } = props;

  const renderItem = ({ item }: any) => {
    return (
      <Column>
        <Row style={styles.renderSubContainer}>
          <Column>
            {item.checked ? (
              <Svg Component={check} style={styles.imageStyle} />
            ) : (
              <Column style={styles.uncheckedView} />
            )}
          </Column>
          <Text style={styles.textStyle}>{item.label}</Text>
        </Row>
      </Column>
    );
  };

  return (
    <Column>
      <Text
        style={[
          typography.h5,
          { marginTop: normalize(27), fontFamily: fonts.MEDIUM },
        ]}>
        {CommonStrings.requirements}
      </Text>
      <FlatList
        scrollEnabled={false}
        renderItem={renderItem}
        data={PasswordValidationData(value)}
        contentContainerStyle={styles.contentContainer}
      />
    </Column>
  );
};

export default PasswordValidation;
