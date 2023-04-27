import { ReactNode } from 'react';
import { ViewStyle, FlatListProps } from 'react-native/types';

type ModalizeGestureProps = {
  panGestureEnabled?: boolean;
  panGestureAnimatedValue?: (gestureValue: any) => void;
};

type ModalizeCallbackProps = {
  onCloseModal: () => void;
  onOverlayPress?: () => void;
  onBackButtonPress?: () => void;
};

type ModalizeComponentProps = {
  HeaderComponent?: ReactNode;
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
  withBorder?: boolean;
  contentRef?: any;
  withOverlay?: boolean;
  flatListRef?: any;
  floatingMode?: boolean;
  flatListProps?: FlatListProps<any>;
  withCloseButton?: boolean;
  ajustToFullViewport?: boolean;
  closeOnOverlayPress?: boolean;
} & ModalizeGestureProps & ModalizeCallbackProps & ModalizeComponentProps & ModalizeComponentStyleProps;

export type ModalizeStyleProps = {
  title?: string;
  height?: string | number;
  visible?: boolean;
  withBorder?: boolean;
  floatingMode?: boolean;
  withCloseButton?: boolean;
  FooterComponent?: ReactNode;
  ajustToFullViewport?: boolean;
};