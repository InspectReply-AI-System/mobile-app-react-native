import React, { useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';

import { styles } from './styles';
import Dot from '@inspectreplyai/assets/svg/dot.svg';
import { CommonStrings } from '@inspectreplyai/utils';
import Tooltip from 'react-native-walkthrough-tooltip';
import Row from '@inspectreplyai/components/general/Row';
import { colors, typography } from '@inspectreplyai/themes';
import Arrow from '@inspectreplyai/assets/svg/rightArrow.svg';
import Column from '@inspectreplyai/components/general/Column';
import { RepairItemProps, TooltipContentProps } from './@types';
import Touchable from '@inspectreplyai/components/general/Touchable';

const TooltipContent: React.FC<TooltipContentProps> = ({ onClose }) => (
  <Column style={styles.tooltipContent}>
    <TouchableHighlight
      onPress={onClose}
      underlayColor={colors.primaryBlue}
      style={styles.firstOption}>
      <Text style={[typography.h5, styles.tooltipOption]}>
        {CommonStrings.saveReport}
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={onClose}
      underlayColor={colors.primaryBlue}
      style={styles.lastOption}>
      <Text style={[typography.h5, styles.tooltipOption]}>
        {CommonStrings.shareReport}
      </Text>
    </TouchableHighlight>
  </Column>
);

export const ReportsCard: React.FC<RepairItemProps> = ({ item }) => {
  const [tooltipVisibleId, setTooltipVisibleId] = useState<string | null>(null);
  const isSelected = tooltipVisibleId === item.id;

  return (
    <Column style={styles.itemContainer}>
      <Row style={styles.itemHeader}>
        <Text style={[typography.body, styles.dateText]}>
          {`${CommonStrings.dateCreated}${item?.dateCreated}`}
        </Text>
        <Tooltip
          isVisible={isSelected}
          content={
            <TooltipContent
              onClose={() => setTooltipVisibleId(null)}
              isSelected={isSelected}
            />
          }
          placement='bottom'
          onClose={() => setTooltipVisibleId(null)}
          contentStyle={styles.tooltipWrapper}
          backgroundColor={colors.transparent}
          backgroundStyle={styles.bgStyle}>
          <Touchable
            onPress={() => setTooltipVisibleId(isSelected ? null : item.id)}>
            <Dot />
          </Touchable>
        </Tooltip>
      </Row>
      <Text style={[typography.h4, styles.addressText]} numberOfLines={2}>
        {item.address}
      </Text>
      <Text style={[typography.h5, styles.costText]}>
        {`${CommonStrings.totalRepairCost} $${item.cost}`}
      </Text>
      <Row style={styles.itemFooter}>
        <Text style={[typography.body, styles.sharedText]}>
          {`${CommonStrings.lastShared} ${item.lastShared}`}
        </Text>
        <Touchable>
          <Row>
            <Text style={[typography.body, styles.viewReportText]}>
              {CommonStrings.viewFullReport}
            </Text>
            <Arrow />
          </Row>
        </Touchable>
      </Row>
    </Column>
  );
};

export const EmptyListComponent: React.FC = () => {
  return (
    <Column style={styles.emptyContainer}>
      <Column style={styles.emptyBox}>
        <Text style={[typography.h5, styles.emptyTextTitle]}>
          {CommonStrings.noReports}
        </Text>
        <Text style={[typography.h6, styles.emptyTextSubtitle]}>
          {CommonStrings.emptyContent}
        </Text>
      </Column>
    </Column>
  );
};
