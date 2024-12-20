import React from 'react';
import { Text } from 'react-native';

import { styles } from '../../styles';
import Config from 'react-native-config';
import ROUTES from '@inspectreplyai/routes/routes';
import { typography } from '@inspectreplyai/themes';
import { Images } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import { BusinessCardProps } from '../../ContractorDetails/@types';
import Touchable from '@inspectreplyai/components/general/Touchable';
import LocalImage from '@inspectreplyai/components/general/LocalImage';

export const BusinessCard = ({ details }: { details: BusinessCardProps }) => {
  const address = `${details.city_name || ''} ${details.state_name || ''} ${details.zip_code || ''}`;

  return (
    <Touchable
      style={styles.card}
      onPress={() =>
        navigate(ROUTES.CONTRACTORSDETAILS, { isNew: false, id: details._id })
      }>
      <Column style={styles.imageBox}>
        <LocalImage
          source={
            details?.profilePhoto
              ? { uri: `${Config.BASE_URL}/${details?.profilePhoto}` }
              : Images.appIcon
          }
          style={styles.profileImageStyle}
        />
      </Column>
      <Text style={[typography.body, styles.businessName]}>
        {details.company_name || ''}
      </Text>
      <Text style={[typography.h7, styles.cardTextStyle]}>
        {details.contractor_name || ''}
      </Text>
      <Text style={[typography.h7, styles.cardTextStyle]}>
        {details.email || ''}
      </Text>
      <Text style={[typography.h7, styles.cardTextStyle]}>
        {details.phone || ''}
      </Text>
      <Text style={[typography.h7, styles.cardTextStyle]}>{address}</Text>
    </Touchable>
  );
};
