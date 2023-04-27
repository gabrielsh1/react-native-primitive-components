import { StyleSheet } from 'react-native';
import type { ModalizeStyleProps } from './types';

import { getHeight } from '../../global/utils/get-dimentions.util';

export const styles = ({
  title,
  height,
  visible,
  withBorder,
  floatingMode,
  withCloseButton,
  FooterComponent,
  ajustToFullViewport,
}: ModalizeStyleProps) => StyleSheet.create({
  // --CONTAINERS-- //
  root: {
    width: '100%',
    height: '100%',

    display: !!visible ? 'flex' : 'none',

    ...StyleSheet.absoluteFillObject,
  },

  container: {
    width: !!floatingMode ? '95%' : '100%',
    height: !!floatingMode ? '98%' : '100%',
    maxHeight: height ? height : !!ajustToFullViewport ? (getHeight + 47) : 350,

    alignSelf: 'center',
    justifyContent: 'space-between',

    position: 'absolute',
    zIndex: 2,
    bottom: !!floatingMode ? '1%' : 0,

    backgroundColor: '#FFF',
    borderTopLeftRadius: !!floatingMode ? 12 : !!withBorder ? 12 : 0,
    borderTopRightRadius: !!floatingMode ? 12 : !!withBorder ? 12 : 0,
    borderBottomLeftRadius: !!floatingMode ? 12 : 0,
    borderBottomRightRadius: !!floatingMode ? 12 : 0,
  },

  content: {
    flex: 1,
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