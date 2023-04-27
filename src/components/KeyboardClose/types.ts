import { ReactNode } from 'react';

export type KeyboardCloseProps = {
  children: ReactNode;
  behavior?: 'height' | 'padding' | 'position' | undefined;
  keyboardVerticalOffset?: number;
};