import React, { useEffect } from 'react';
import { Text, SectionList } from 'react-native';

import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { CommonStrings } from '@inspectreplyai/utils';
import { Images } from '@inspectreplyai/themes/appImages';
import Search from '@inspectreplyai/assets/svg/search.svg';
import { colors, typography } from '@inspectreplyai/themes';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import { BusinessCardProps, SectionData, sections } from './data';
import Touchable from '@inspectreplyai/components/general/Touchable';
import LocalImage from '@inspectreplyai/components/general/LocalImage';
import FloatingButton from '@inspectreplyai/components/floatingButton';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import Row from '@inspectreplyai/components/general/Row';
import { useAppDispatch } from '@inspectreplyai/hooks/reduxHooks';
import { getContractors } from '@inspectreplyai/redux/contractor/action';

const BusinessCard = ({
  name,
  contactPerson,
  email,
  phone,
  address,
}: BusinessCardProps) => (
  <Touchable
    style={styles.card}
    onPress={() => navigate(ROUTES.CONTRACTORSDETAILS, { isNew: false })}>
    <Column style={styles.imageBox}>
      <LocalImage source={Images.appIcon} style={styles.profileImageStyle} />
    </Column>
    <Text style={[typography.body, styles.businessName]}>{name}</Text>
    <Text style={[typography.h7, styles.contact]}>{contactPerson}</Text>
    <Text style={[typography.h7, styles.email]}>{email}</Text>
    <Text style={[typography.h7, styles.phone]}>{phone}</Text>
    <Text style={typography.h7}>{address}</Text>
  </Touchable>
);

const Contractors = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getContractors({
        page: 1,
        limit: 10,
      }),
    );
  }, []);
  const renderSectionHeader = ({
    section: { title, data },
  }: {
    section: SectionData;
  }) => {
    return (
      <Column style={styles.headerView}>
        <Text style={[typography.h5, styles.sectionHeader]}>
          {title} ({data.length})
        </Text>
      </Column>
    );
  };

  const renderItemInColumns = ({ item, index, section }: any) => {
    if (index % 2 === 0) {
      const nextItem = section.data[index + 1];
      return (
        <Row style={styles.row}>
          <BusinessCard {...item} />
          {nextItem && <BusinessCard {...nextItem} />}
        </Row>
      );
    }
    return null;
  };

  return (
    <Column style={styles.container}>
      <FloatingButton
        customStyle={styles.floatingBtnStyle}
        onPress={() => {
          navigate(ROUTES.CONTRACTORSDETAILS, { isNew: true });
        }}
      />
      <CustomHeader title={CommonStrings.contractors} />
      <CustomInput
        RightIcon={Search}
        placeholder={CommonStrings.search}
        customStyle={styles.customTextStyle}
        placeholderTextColor={colors.white}
      />
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItemInColumns}
      />
    </Column>
  );
};

export default Contractors;
