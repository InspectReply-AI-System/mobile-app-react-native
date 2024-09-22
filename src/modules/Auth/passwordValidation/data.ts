import {
  checklength,
  checkLowerCase,
  checkNumeric,
  checkUpperCase,
} from '@inspectreplyai/utils/validatorsUtils';

const PasswordValidationData = (value: string) => {
  return [
    {
      id: 1,
      value: 'length',
      checked: checklength(value),
      label: 'At least 12 characters',
    },
    {
      id: 2,
      value: 'uppercase',
      label: 'Uppercase letter',
      checked: checkUpperCase(value),
    },
    {
      id: 3,
      value: 'lowercase',
      label: 'Lowercase letter',
      checked: checkLowerCase(value),
    },
    {
      id: 4,
      value: 'numeric',
      label: 'Number',
      checked: checkNumeric(value),
    },
  ];
};

export { PasswordValidationData };
