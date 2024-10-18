import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { colors } from '@inspectreplyai/themes';
import { NetInfoScreen } from './netInfo';

/**
 * used to check if internet is available or not
 */

export default function NetInfoHandler() {
  const [connected, setConnected] = useState<boolean | null>(true);

  /**
   * netinfo listener added
   */
  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });
  }, []);

  /**
   * called when retry is pressed
   */
  const onRetryPress = () => {
    NetInfo.refresh()
      .then((state) => {
        setConnected(state.isConnected);
      })
      .catch(() => {
        // console.log('NetInfo.refresh err', err);
      });
  };

  /**
   * if internet is connected return null otherwise show no internet modal
   */
  if (connected) {
    return null;
  }

  return (
    <Modal
      coverScreen
      avoidKeyboard
      scrollHorizontal
      isVisible={!connected}
      animationInTiming={600}
      animationOutTiming={300}
      animationOut='fadeOutDown'
      style={styles.modalContainer}>
      <NetInfoScreen onPressRetry={onRetryPress} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
  },
});
