import { useEffect } from 'react';
import { Portal } from 'react-native-portalize';
import { getHeight } from '../../global/utils/get-dimentions.util';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { View, Text, BackHandler, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Animated, { runOnJS, withDelay, withTiming, interpolate, Extrapolate, useSharedValue, useAnimatedStyle, useAnimatedGestureHandler } from 'react-native-reanimated';

import { EvilIcons } from '@expo/vector-icons';

import type { ModalizeProps } from './types';
import { styles } from './styles';

const OVERLAY_TIMING = 400;
const TRANSLATE_Y_TIMING = 400;

export function Modalize({
  // --PROPS-- //
  title,
  height,
  visible,
  children,
  withHandle = true,
  withHeader = false,
  contentRef,
  flatListRef,
  flatListProps,
  withCloseButton = false,
  ajustToFullViewport = false,
  ajustToContentHeight = false,

  // --STYLE-- //
  rootStyle,
  handleStyle,
  headerStyle,
  footerStyle,
  overlayStyle,
  contentStyle,
  floatingStyle,
  flatListStyle,
  containerStyle,

  // --COMPONENTS-- //
  FooterComponent,
  FloatingComponent,

  // --CALLBACK-- //
  onToggleModal,
}: ModalizeProps) {
  const modalAnimation = useSharedValue(getHeight);
  const overlayAnimation = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: interpolate(
          modalAnimation.value,
          [0, getHeight],
          [0, (getHeight + 48)],
          Extrapolate.CLAMP,
        ),
      }],
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayAnimation.value,
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event: any, ctx: any) {
      ctx.modalAnimation = modalAnimation.value;
    },
    onActive(event: any, ctx: any) {
      const velocityYValue = event?.velocityY?.toFixed(0);

      if (velocityYValue >= 500 && velocityYValue <= 1000) {
        modalAnimation.value = ctx.modalAnimation + event.translationY;

        return;
      };

      modalAnimation.value = ctx.modalAnimation + event.translationY;
    },
    onEnd(event: any) {
      const velocityYValue = event?.velocityY?.toFixed(0);
      const translationYValue = event?.translationY?.toFixed(0);

      if (velocityYValue >= 1000) {
        modalAnimation.value = withTiming(getHeight + 256, {
          duration: 700,
        });

        overlayAnimation.value = withDelay(350, withTiming(0, {
          duration: OVERLAY_TIMING,
        }));

        runOnJS(handleUnmountComponentWithDelay)(725);

        return;
      };

      if (translationYValue >= 200) {
        modalAnimation.value = withTiming(getHeight + 256, {
          duration: 700,
        });

        overlayAnimation.value = withDelay(350, withTiming(0, {
          duration: OVERLAY_TIMING,
        }));

        runOnJS(handleUnmountComponentWithDelay)(725);

        return;
      };

      modalAnimation.value = withTiming(0, {
        duration: TRANSLATE_Y_TIMING,
      });
    },
  });

  function handleAnimateIn() {
    // --OVERLAY-- //
    overlayAnimation.value = withTiming(1, {
      duration: OVERLAY_TIMING,
    });

    // --TRANSLATE-Y-- //
    modalAnimation.value = withTiming(0, {
      duration: TRANSLATE_Y_TIMING,
    });
  };

  function handleAnimateOut() {
    // --OVERLAY-- //
    overlayAnimation.value = withTiming(0, {
      duration: OVERLAY_TIMING,
    });

    // --TRANSLATE-Y-- //
    modalAnimation.value = withTiming(getHeight + 256, {
      duration: TRANSLATE_Y_TIMING,
    });

    setTimeout(() => onToggleModal(), 525);
  };

  function handleResetAnimationsValues() {
    modalAnimation.value = getHeight;
    overlayAnimation.value = 0;
  };

  function handleUnmountComponentWithDelay(amount?: number) {
    setTimeout(() => onToggleModal(), amount || 525);
  };

  useEffect(() => {
    if (!!visible) {
      handleAnimateIn();
    };

    // --UNMOUNT-- //
    return () => {
      handleResetAnimationsValues();
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const backAction = () => {
      handleAnimateOut();

      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [visible]);

  return !!visible ? (
    <Portal>
      <View style={[styles({ visible }).root, rootStyle]}>
        {/* --OVERLAY-- */}
        <TouchableWithoutFeedback onPress={handleAnimateOut}>
          <Animated.View style={[styles({}).overlay, overlayStyle, overlayAnimatedStyle]} />
        </TouchableWithoutFeedback>

        {/* --CONTAINER-- */}
        <Animated.View
          style={[
            containerStyle,
            modalAnimatedStyle,
            styles({ height, ajustToFullViewport, ajustToContentHeight }).container
          ]}
        >
          {/* --HANDLE-- */}
          {withHandle && (
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={styles({}).handle}>
                <View style={[styles({}).handleIndicator, handleStyle]} />
              </Animated.View>
            </PanGestureHandler>
          )}

          {/* --HEADER-- */}
          {withHeader && (
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={[styles({ title, withCloseButton }).header, headerStyle]}>
                {title && <Text style={styles({}).title}>{title}</Text>}

                {withCloseButton && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleAnimateOut}
                    style={styles({}).closeButton}
                  >
                    <EvilIcons name="close" size={32} color="black" />
                  </TouchableOpacity>
                )}
              </Animated.View>
            </PanGestureHandler>
          )}

          {/* --CONTENT-- */}
          {flatListProps ? (
            <Animated.FlatList
              ref={flatListRef}
              {...flatListProps}
              style={[flatListStyle]}
            />
          ) : (
            <Animated.ScrollView
              ref={contentRef}
              style={[styles({}).content, contentStyle]}
            >
              {children}
            </Animated.ScrollView>
          )}

          {/* --FLOATING-- */}
          {FloatingComponent && (
            <View style={[styles({ FooterComponent }).floating, floatingStyle]}>
              {FloatingComponent}
            </View>
          )}

          {/* --FOOTER-- */}
          {FooterComponent && (
            <View style={[styles({}).footer, footerStyle]}>
              {FooterComponent}
            </View>
          )}
        </Animated.View>
      </View>
    </Portal>
  ) : null;
};