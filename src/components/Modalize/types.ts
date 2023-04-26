import { ReactNode } from 'react';
import { ViewStyle, FlatListProps, Animated } from 'react-native/types';

type ModalizeCallbackProps = {
  onOpen?: () => void;
  onClose?: () => void;
  onOverlayPress?: () => void;
  onBackButtonPress?: () => void;
  onToggleModal: () => void;
};

type ModalizeComponentProps = {
  FooterComponent?: ReactNode;
  FloatingComponent?: ReactNode;
};

type ModalizeComponentStyleProps = {
  rootStyle?: ViewStyle | ViewStyle[];
  handleStyle?: ViewStyle | ViewStyle[];
  headerStyle?: ViewStyle | ViewStyle[];
  footerStyle?: ViewStyle | ViewStyle[];
  overlayStyle?: ViewStyle | ViewStyle[];
  contentStyle?: ViewStyle | ViewStyle[];
  floatingStyle?: ViewStyle | ViewStyle[];
  flatListStyle?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
};

export type ModalizeProps = {
  title?: string;
  height?: number;
  visible: boolean;
  children?: ReactNode;
  withHandle?: boolean;
  withHeader?: boolean;
  contentRef?: any;
  flatListRef?: any;
  flatListProps?: FlatListProps<any>;
  withCloseButton?: boolean;
  ajustToFullViewport?: boolean;
  ajustToContentHeight?: boolean;
} & ModalizeCallbackProps & ModalizeComponentProps & ModalizeComponentStyleProps;

export type ModalizeStyleProps = {
  title?: string;
  height?: string | number;
  visible?: boolean;
  withCloseButton?: boolean;
  FooterComponent?: ReactNode;
  ajustToFullViewport?: boolean;
  ajustToContentHeight?: boolean;
};