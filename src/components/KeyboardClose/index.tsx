import { getOS } from '../../global/utils/get-os-util';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import type { KeyboardCloseProps } from './types';

export function KeyboardClose({ children, behavior, keyboardVerticalOffset }: KeyboardCloseProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset || 60}
      behavior={behavior || (getOS === 'ios' ? 'padding' : undefined)}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
