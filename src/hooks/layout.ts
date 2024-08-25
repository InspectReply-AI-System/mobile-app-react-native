import { useEffect } from 'react';
import { LayoutAnimation, UIManager } from 'react-native';

import { isIOS } from '@inspectreplyai/utils/platform';

function useLayoutAnimation({
  preset = LayoutAnimation.Presets.easeInEaseOut,
  androidEnabled = true,
} = {}) {
  useEffect(() => {
    if (
      !isIOS &&
      UIManager.setLayoutAnimationEnabledExperimental &&
      androidEnabled
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, [androidEnabled]);

  const animateLayout = () => LayoutAnimation.configureNext(preset);
  return {
    animateLayout,
  };
}

export default useLayoutAnimation;
