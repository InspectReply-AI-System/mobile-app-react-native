import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import { styles } from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import Touchable from '../general/Touchable';
import { vh } from '@inspectreplyai/utils';

/**
 * @description custom bottom sheet
 */
const RNBottomSheet = forwardRef(({ height = vh(390), children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const refRBSheet = useRef();

  useImperativeHandle(ref, () => ({
    openSheet() {
      setIsVisible(true);
      refRBSheet?.current?.open();
    },
    closeSheet() {
      setIsVisible(false);
      refRBSheet?.current?.close();
    },
  }));

  return (
    <>
      <Touchable
        style={styles.mainContainer}
        onPress={() => {
          setIsVisible(false);
        }}>
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask
          height={height}
          customStyles={{
            container: styles.bottomSheetRadius,
            draggableIcon: styles.bottomSheetIcon,
          }}
          closeOnDragDown={true}
          onClose={() => {
            setIsVisible(false);
          }}>
          {children}
        </RBSheet>
      </Touchable>
      {isVisible && (
        <BlurView style={styles.absolute} blurType='dark' blurAmount={4} />
      )}
    </>
  );
});

RNBottomSheet.displayName = 'RNBottomSheet';

export default RNBottomSheet;
