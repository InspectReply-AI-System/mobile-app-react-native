import React, { useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';

import { styles } from './styles';
import Row from '@inspectreplyai/components/general/Row';
import { CommonStrings, vh } from '@inspectreplyai/utils';
import { Icons, SvgIcon } from '@inspectreplyai/themes/appImages';
import { colors, typography } from '@inspectreplyai/themes';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import Touchable from '@inspectreplyai/components/general/Touchable';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';

const CheckoutScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<
    'useCredit' | 'purchaseMore' | null
  >(null);
  const [isPrimaryButtonEnabled, setIsPrimaryButtonEnabled] = useState(false);
  const accessFullReport = true;
  // Effect to enable the PrimaryButton if any selection is made
  useEffect(() => {
    if (selectedOption || selectedButton) {
      setIsPrimaryButtonEnabled(true);
    } else {
      setIsPrimaryButtonEnabled(false);
    }
  }, [selectedOption, selectedButton]);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setSelectedButton(null); // Reset PurchaseReportData button selections
  };

  const handleSelectButton = (button: 'useCredit' | 'purchaseMore') => {
    setSelectedButton(button);
    setSelectedOption(null);
  };

  const includedItems = [
    'Repair Cost Estimation',
    'Local Contractor Referrals',
    'Repair Methodology',
    'Detailed Report of Repairs',
  ];

  const IncludedSection = () => (
    <Column style={styles.includedSection}>
      <Text style={[typography.h5, styles.includedHeader]}>
        {CommonStrings.whatIncluded}
      </Text>
      <FlatList
        bounces={false}
        data={includedItems}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Row style={{ alignItems: 'center', marginTop: vh(8) }}>
            <SvgIcon.RightIcon />
            <Text style={[typography.body, styles.includedItem]}>{item}</Text>
          </Row>
        )}
      />
    </Column>
  );

  const FullReportData = () => (
    <Touchable
      style={[
        styles.card,
        styles.greenCard,
        selectedOption === CommonStrings.fullReport && styles.selectedCard,
      ]}
      onPress={() => handleSelectOption('fullReport')}>
      <Text style={[typography.h8, styles.fullPrice]}>$9.99</Text>
      <Text style={[typography.h6, styles.description]}>
        Purchase Full Report
      </Text>
      <Touchable
        style={[
          styles.selectButton,
          {
            backgroundColor:
              selectedOption === CommonStrings.fullReport
                ? colors.black
                : colors.green,
          },
        ]}
        onPress={() => handleSelectOption('fullReport')}>
        <Text
          style={[
            typography.body,
            styles.buttonText,
            {
              color:
                selectedOption === CommonStrings.fullReport
                  ? colors.white
                  : colors.black,
            },
          ]}>
          {selectedOption === CommonStrings.fullReport ? 'Selected' : 'Select'}
        </Text>
      </Touchable>
    </Touchable>
  );

  const PurchaseReportData = () => (
    <Column
      style={[
        styles.card1,
        styles.greenCard,
        selectedButton === CommonStrings.useCredit && styles.selectedCard,
      ]}>
      <Text style={[typography.h8, styles.fullPrice]}>
        {CommonStrings.useOneCredit}
      </Text>
      <Text style={[typography.body, styles.fullPrice, { marginTop: vh(4) }]}>
        {'You have 7/10'}
      </Text>
      <Text style={[typography.body, styles.fullPrice, { marginTop: vh(4) }]}>
        {CommonStrings.creditRemaining}
      </Text>

      <Row>
        <Touchable
          style={[
            styles.selectButton1,
            {
              backgroundColor:
                selectedButton === CommonStrings.useCredit
                  ? colors.black
                  : colors.green,
            },
          ]}
          onPress={() => handleSelectButton('useCredit')}>
          <Text
            style={[
              typography.body,
              styles.buttonText,
              {
                color:
                  selectedButton === CommonStrings.useCredit
                    ? colors.white
                    : colors.black,
              },
            ]}>
            {CommonStrings.useCredit}
          </Text>
        </Touchable>

        <Touchable
          style={[
            styles.selectButton1,
            {
              backgroundColor:
                selectedButton === 'purchaseMore' ? colors.black : colors.green,
            },
          ]}
          onPress={() => handleSelectButton('purchaseMore')}>
          <Text
            style={[
              typography.body,
              styles.buttonText,
              {
                color:
                  selectedButton === 'purchaseMore'
                    ? colors.white
                    : colors.black,
              },
            ]}>
            {CommonStrings.purchaseMore}
          </Text>
        </Touchable>
      </Row>
    </Column>
  );

  return (
    <>
      <CustomHeader title={CommonStrings.checkout} leftIcon={Icons.backIcon} />
      <ScrollContainer style={styles.container}>
        {accessFullReport ? <FullReportData /> : <PurchaseReportData />}
        <Touchable
          style={[
            styles.card,
            styles.blueCard,
            selectedOption === CommonStrings.tenReports && styles.selectedCard,
          ]}
          onPress={() => handleSelectOption(CommonStrings.tenReports)}>
          <Text style={typography.h8}>$90</Text>
          <Text style={[typography.h6, styles.description1]}>
            Purchase 10 Reports
          </Text>
          <Touchable
            style={[
              styles.tenReportSelectButton,
              {
                backgroundColor:
                  selectedOption === CommonStrings.tenReports
                    ? colors.blue75BEF4
                    : colors.blue465B85,
              },
            ]}
            onPress={() => handleSelectOption(CommonStrings.tenReports)}>
            <Text
              style={[
                typography.body,
                styles.buttonText,
                {
                  color:
                    selectedOption === CommonStrings.tenReports
                      ? colors.white
                      : colors.blue75BEF4,
                },
              ]}>
              {selectedOption === CommonStrings.tenReports
                ? 'Selected'
                : 'Select'}
            </Text>
          </Touchable>
        </Touchable>

        <IncludedSection />

        <PrimaryButton
          {...(!isPrimaryButtonEnabled
            ? { titleStyle: styles.buttonTitleStyle }
            : {})}
          {...(!isPrimaryButtonEnabled
            ? { containerStyle: styles.primaryButton }
            : {})}
          title={CommonStrings.purchase}
          disabled={!isPrimaryButtonEnabled}
          onPress={() => {
            reset(ROUTES.BOTTOMTAB);
          }}
        />
      </ScrollContainer>
    </>
  );
};

export default CheckoutScreen;
