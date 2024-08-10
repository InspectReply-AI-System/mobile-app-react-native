import React from 'react';
import { Animated, PanResponder } from 'react-native';

interface UseSwipeDownToDismissProps {
  animatedValue: Animated.Value;
  onDismiss: () => void;
  onRestore: () => void;
}

const animatedValueFromGesture = (dy: number): number => 1 - dy / 500;

function useSwipeDownToDismiss({
  animatedValue,
  onDismiss,
  onRestore,
}: UseSwipeDownToDismissProps) {
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dy }) => {
          if (dy > 0) {
            animatedValue.setValue(animatedValueFromGesture(dy));
          }
        },
        onPanResponderRelease: (_, { dy }) => {
          if (animatedValueFromGesture(dy) < 0.7) {
            onDismiss();
          } else {
            onRestore();
          }
        },
      }),
    [animatedValue, onDismiss, onRestore],
  );
  return {
    panResponder,
  };
}

export default useSwipeDownToDismiss;
