import React, { useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';

import { styles } from './styles';
import Dot from '@inspectreplyai/assets/svg/dot.svg';
import Tooltip from 'react-native-walkthrough-tooltip';
import Row from '@inspectreplyai/components/general/Row';
import { colors, typography } from '@inspectreplyai/themes';
import Arrow from '@inspectreplyai/assets/svg/rightArrow.svg';
import Column from '@inspectreplyai/components/general/Column';
import { RepairItemProps, TooltipContentProps } from './@types';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { CommonFunctions, CommonStrings } from '@inspectreplyai/utils';
import { ReportActions, ReportsTopTabs } from '@inspectreplyai/utils/Enums';

const TooltipContent: React.FC<TooltipContentProps> = ({ onClose }) => (
  <Column style={styles.tooltipContent}>
    <TouchableHighlight
      onPress={() => onClose(ReportActions.FAVORITE)}
      underlayColor={colors.primaryBlue}
      style={styles.firstOption}>
      <Text style={[typography.h5, styles.tooltipOption]}>
        {CommonStrings.saveReport}
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() => onClose(ReportActions.SHARE)}
      underlayColor={colors.primaryBlue}
      style={styles.lastOption}>
      <Text style={[typography.h5, styles.tooltipOption]}>
        {CommonStrings.shareReport}
      </Text>
    </TouchableHighlight>
  </Column>
);

export const ReportsCard: React.FC<RepairItemProps> = ({
  item,
  onTooltipAction,
  tab,
  onPressFullReport,
}) => {
  const [tooltipVisibleId, setTooltipVisibleId] = useState<string | null>(null);
  const isSelected = tooltipVisibleId === item._id;

  return (
    <Column style={styles.itemContainer}>
      <Row style={styles.itemHeader}>
        <Text style={[typography.body, styles.dateText]}>
          {`${CommonStrings.dateCreated}${CommonFunctions.dateFormatter(item?.createdAt)}`}
        </Text>
        <Tooltip
          isVisible={isSelected}
          content={
            <TooltipContent
              onClose={(type: ReportActions) => {
                setTooltipVisibleId(null);
                onTooltipAction(type, item._id);
              }}
              isSelected={isSelected}
            />
          }
          placement='bottom'
          onClose={() => setTooltipVisibleId(null)}
          contentStyle={styles.tooltipWrapper}
          backgroundColor={colors.transparent}
          backgroundStyle={styles.bgStyle}>
          {tab === ReportsTopTabs.RECENT && (
            <Touchable
              onPress={() =>
                setTooltipVisibleId(isSelected ? null : item?._id)
              }>
              <Dot />
            </Touchable>
          )}
        </Tooltip>
      </Row>
      <Text style={[typography.h4, styles.addressText]} numberOfLines={2}>
        {item?.address}
      </Text>
      <Text style={[typography.h5, styles.costText]}>
        {`${CommonStrings.totalRepairCost} ${CommonFunctions.formatCurrency(item?.estimated_price)}`}
      </Text>
      <Row style={styles.itemFooter}>
        {item?.last_shared && (
          <Text style={[typography.body, styles.sharedText]}>
            {`${CommonStrings.lastShared} ${CommonFunctions.dateFormatter(item?.last_shared)}`}
          </Text>
        )}
        <Touchable
          onPress={() => onPressFullReport(item._id)}
          style={styles.fullReportView}>
          <Row>
            <Text style={[typography.body, styles.viewReportText]}>
              {CommonStrings.purchaseFullReport}
            </Text>
            <Arrow />
          </Row>
        </Touchable>
      </Row>
    </Column>
  );
};

export const EmptyListComponent = ({ loading }: { loading: boolean }) => {
  return (
    <Column style={styles.emptyContainer}>
      {!loading && (
        <Column style={styles.emptyBox}>
          <Text style={[typography.h5, styles.emptyTextTitle]}>
            {CommonStrings.noReports}
          </Text>
          <Text style={[typography.h6, styles.emptyTextSubtitle]}>
            {CommonStrings.emptyContent}
          </Text>
        </Column>
      )}
    </Column>
  );
};
