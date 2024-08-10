import { useCallback, useState } from 'react';
import {
  ModalData,
  ModalOptions,
  ModalShowParams,
} from '@inspectreplyai/components/general/ModalManager/@types/index.js';
import { ModalProps } from 'react-native';
import { merge } from 'lodash';

export type UseModalParams = {
  defaultOptions: Omit<ModalProps, 'config'>;
};

const DEFAULT_OPTIONS: ModalOptions = {
  dismissable: true,
  position: 'center',
  animated: false,
};

export const useModal = ({ defaultOptions }: UseModalParams) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<ModalData>({
    children: null,
  });

  const initialOptions = merge(
    DEFAULT_OPTIONS,
    defaultOptions,
  ) as Required<ModalOptions>;

  const [options, setOptions] = useState<ModalOptions>(initialOptions);

  const show = useCallback(
    (params: ModalShowParams) => {
      setData({
        children: params.children ?? null,
      });
      setOptions({
        dismissable: params.dismissable ?? initialOptions.dismissable,
        position: params.position ?? initialOptions.position,
        animated: params.animated,
      });
      setIsVisible(true);
    },
    [initialOptions],
  );

  const hide = useCallback(() => {
    setIsVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOptions]);

  const onHide = useCallback(() => {
    setData({
      children: null,
    });
    setOptions(initialOptions);
  }, [initialOptions]);

  return {
    show,
    hide,
    data,
    onHide,
    options,
    isVisible,
  };
};
