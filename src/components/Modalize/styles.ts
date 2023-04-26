import { StyleSheet } from 'react-native';
import type { ModalizeStyleProps } from './types';

export const styles = ({
  title,
  height,
  visible,
  withCloseButton,
  FooterComponent,
  ajustToFullViewport,
  ajustToContentHeight,
}: ModalizeStyleProps) => StyleSheet.create({
  // --CONTAINERS-- //
  root: {
    width: '100%',
    height: '100%',

    display: !!visible ? 'flex' : 'none',

    ...StyleSheet.absoluteFillObject,
  },

  container: {
    width: '100%',
    height: height ? height :
      !!ajustToFullViewport ? '100%' :
      !!ajustToContentHeight ? undefined : 350,
    
    maxHeight: '100%',

    justifyContent: 'space-between',

    position: 'absolute',
    zIndex: 2,
    bottom: 0,

    backgroundColor: '#FFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  content: {
    flex: 1,
    position: 'relative',

    // backgroundColor: 'rgba(0, 255, 0, 0.25)',
  },

  overlay: {
    width: '100%',
    height: '100%',

    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  header: {
    width: '100%',
    height: 56,
    paddingLeft: (!!withCloseButton && !title) ? 6 : 16,
    paddingRight: !!withCloseButton ? 6 : 16,

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

    // backgroundColor: 'rgba(255, 0, 0, 0.25)',
  },

  floating: {
    position: 'absolute',
    zIndex: 3,
    right: 16,
    bottom: FooterComponent ? 74 : 16,
  },

  footer: {
    width: '100%',
    padding: 16,

    // backgroundColor: 'rgba(0, 0, 255, 0.25)',
  },

  handle: {
    width: '100%',
    paddingVertical: 6,

    alignItems: 'center',
    justifyContent: 'center',
  },

  handleIndicator: {
    width: 40,
    height: 4,
    
    borderRadius: 24,
    backgroundColor: 'rgba(60, 60, 67, 0.18)',
  },

  closeButton: {
    width: 42,
    height: 42,

    alignItems: 'center',
    justifyContent: 'center',
  },

  // --TEXTS-- //
  title: {
    fontSize: 20,
    lineHeight: 24,

    color: '#000',
  },
});