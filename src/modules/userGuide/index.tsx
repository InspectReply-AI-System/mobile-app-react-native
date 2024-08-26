import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';
import LeftArrow from '@inspectreplyai/assets/svg/downLeft.svg';
import Column from '@inspectreplyai/components/general/Column';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import Report from '@inspectreplyai/assets/svg/Report.svg';
import { typography } from '@inspectreplyai/themes';
import RightArrow from '@inspectreplyai/assets/svg/downRight.svg';
import Contractor from '@inspectreplyai/assets/svg/Contractors.svg';
import AddIcon from '@inspectreplyai/assets/svg/addIconBtn.svg';

interface UserGuideProps {
  isVisible: boolean;
  onClose: () => void;
  step: 1 | 2 | 3;
}

const UserGuide: React.FC<UserGuideProps> = ({ isVisible, onClose, step }) => {
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Column>
            <Text style={[typography.h5, styles.text]}>
              This is the report section where you can view all your recent,
              saved, and shared reports.
            </Text>
            <PrimaryButton
              title='Got it'
              containerStyle={styles.button}
              onPress={onClose}
            />
            <Column style={styles.leftArrowContainer}>
              <LeftArrow />
            </Column>
            <Report />
          </Column>
        );
      case 2:
        return (
          <Column style={styles.step2Container}>
            <Text style={[typography.h5, styles.text]}>
              Click this to upload a report.
            </Text>
            <PrimaryButton
              title='Got it'
              containerStyle={styles.button}
              onPress={onClose}
            />
            <Column style={styles.rightArrowContainer}>
              <RightArrow />
            </Column>
            <Column style={styles.addIconContainer}>
              <AddIcon />
            </Column>
          </Column>
        );
      case 3:
        return (
          <Column>
            <Text style={[typography.h5, styles.text]}>
              This is the Contractor Section. About this section.
            </Text>
            <Column style={styles.step3ButtonContainer}>
              <PrimaryButton
                title='Got it'
                containerStyle={styles.button}
                onPress={onClose}
              />
              <Column style={styles.step3ArrowContainer}>
                <LeftArrow />
              </Column>
            </Column>
            <Column style={styles.contractorIconContainer}>
              <Contractor />
            </Column>
          </Column>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      useNativeDriver
      backdropOpacity={1}
      customBackdrop={
        <BlurView style={styles.absolute} blurType='dark' blurAmount={4} />
      }
      animationIn='fadeIn'
      animationOut='fadeOut'>
      <View style={styles.container}>{renderStepContent()}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  addIconContainer: {
    alignItems: 'flex-end',
    left: vw(20),
  },
  button: {
    borderRadius: normalize(100),
    marginHorizontal: vw(85),
    height: vh(40),
  },
  container: {
    position: 'absolute',
    bottom: vh(50),
    alignItems: 'center',
  },
  contractorIconContainer: {
    left: vw(80),
  },
  leftArrowContainer: {
    marginBottom: vh(10),
    marginLeft: vw(15),
    marginTop: vw(-15),
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightArrowContainer: {
    alignItems: 'flex-end',
    marginRight: vw(20),
    marginTop: vh(-20),
  },
  step2Container: {
    marginBottom: vh(100),
  },
  step3ArrowContainer: {
    left: vw(100),
    top: vh(20),
  },
  step3ButtonContainer: {
    marginBottom: vh(40),
  },
  text: {
    textAlign: 'center',
    marginHorizontal: vw(56),
  },
});

export default UserGuide;
