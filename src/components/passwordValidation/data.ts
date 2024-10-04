import { CommonStrings } from '@inspectreplyai/utils';
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
      label: CommonStrings.alLeast8Characters,
    },
    {
      id: 2,
      value: 'uppercase',
      label: CommonStrings.uppercaseLetter,
      checked: checkUpperCase(value),
    },
    {
      id: 3,
      value: 'lowercase',
      label: CommonStrings.lowerCaseLetter,
      checked: checkLowerCase(value),
    },
    {
      id: 4,
      value: 'numeric',
      label: CommonStrings.number,
      checked: checkNumeric(value),
    },
  ];
};

export { PasswordValidationData };
