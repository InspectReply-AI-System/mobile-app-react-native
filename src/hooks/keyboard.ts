import { useEffect, useRef } from 'react';
import { EmitterSubscription, KeyboardEventName, Keyboard } from 'react-native';

import { callRefMethod } from '@inspectreplyai/utils/ref';

const VISIBILITY_TYPES = {
  AFTER: 'after',
  BEFORE: 'before', // only for iOS
};

function useKeyboardEvent(
  ev: KeyboardEventName,
  cb: (e: any) => void,
  cond = true,
): () => void {
  const ref = useRef<EmitterSubscription | null>(null);

  useEffect(() => {
    const addListener = () => {
      ref.current = Keyboard.addListener(ev, cb);
    };

    const removeListener = () => {
      if (ref.current) {
        callRefMethod(ref, 'remove');
        ref.current = null;
      }
    };

    if (cond) {
      addListener();
    } else {
      removeListener();
    }
    return removeListener;
  }, [ev, cb, cond]);

  return ref.current?.remove ?? (() => {});
}

export { VISIBILITY_TYPES, useKeyboardEvent };
