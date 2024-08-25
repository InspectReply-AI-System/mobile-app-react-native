import { useRef } from 'react';

const useRefs = () => {
  const refs = useRef<any>({});

  const setRef = (fieldName: string) => (ref: any) => {
    if (!ref) {
      return;
    }
    if (fieldName) {
      refs.current[fieldName] = ref;
    }
  };

  const focusOnElement = (elementName: string) => {
    if (!elementName) {
      return;
    }
    refs.current[elementName].focus();
  };

  return {
    setRef,
    focusOnElement,
  };
};

export default useRefs;
