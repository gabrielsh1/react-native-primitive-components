import { useState, useEffect } from 'react';
import { getOS } from '../../global/utils/get-os-util';
import { Portal } from 'react-native-portalize';
import { getHeight } from '../../global/utils/get-dimentions.util';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { View, Text, BackHandler, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Animated, { runOnJS, withDelay, withSpring, withTiming, interpolate, Extrapolate, useSharedValue, useAnimatedStyle, useAnimatedGestureHandler } from 'react-native-reanimated';

import { EvilIcons } from '@expo/vector-icons';

import { KeyboardClose } from '../KeyboardClose';

import type { ModalizeProps } from './types';
import { styles } from './styles';

const OVERLAY_TIMING = 400;
const CONTENT_TIMING = 300;

function ModalSafeAreaView({ children }: any) {
  if (getOS === 'ios') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {children}
      </SafeAreaView>
    );
  };

  return children;
};

function PanGestureComponentEnabled({ children, onGestureEvent, panGestureEnabled }: any) {
  if (!!panGestureEnabled) {
    return (
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        {children}
      </PanGestureHandler>
    );
  };

  return children;
};

export function Modalize({
  // --PROPS-- //
  title,
  height,
  visible,
  children,
  withHandle = true,
  withHeader = false,
  withBorder = true,
  contentRef,
  withOverlay = true,
  flatListRef,
  floatingMode = false,
  flatListProps,
  withCloseButton = false,
  ajustToFullViewport = false,
  closeOnOverlayPress = true,

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
  HeaderComponent,
  FooterComponent,
  FloatingComponent,

  // --CALLBACK-- //
  onCloseModal,
  onOverlayPress,
  onBackButtonPress,

  // --GESTURE-- //
  panGestureEnabled = true,
  panGestureAnimatedValue,
}: ModalizeProps) {
  const [renderContent, setRenderContent] = useState<boolean>(false);

  const modalAnimation = useSharedValue(getHeight);
  const overlayAnimation = useSharedValue(0);
  const contentAnimation = useSharedValue(0);

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

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentAnimation.value,
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event: any, ctx: any) {
      ctx.modalAnimation = modalAnimation.value;
    },
    onActive(event: any, ctx: any) {
      const velocityYValue = event?.velocityY?.toFixed(0);

      if (velocityYValue >= 1000) {
        modalAnimation.value = ctx.modalAnimation + event.translationY;

        return;
      };

      modalAnimation.value = ctx.modalAnimation + event.translationY;

      runOnJS(handleGetPanGestureValue)(ctx.modalAnimation + event.translationY);
    },
    onEnd(event: any, ctx) {
      const velocityYValue = event?.velocityY?.toFixed(0);
      const translationYValue = event?.translationY?.toFixed(0);

      if (velocityYValue >= 1000) {
        modalAnimation.value = withSpring(getHeight + 256, {
          stiffness: 256,
          damping: 124,
        });

        overlayAnimation.value = withDelay(350, withTiming(0, {
          duration: OVERLAY_TIMING,
        }));

        runOnJS(handleUnmountComponentWithDelay)(725);

        return;
      };

      if (translationYValue >= 200) {
        modalAnimation.value = withSpring(getHeight + 256, {
          stiffness: 256,
          damping: 124,
        });

        overlayAnimation.value = withDelay(350, withTiming(0, {
          duration: OVERLAY_TIMING,
        }));

        runOnJS(handleUnmountComponentWithDelay)(725);

        return;
      };

      modalAnimation.value = withSpring(0, {
        stiffness: 360,
        damping: 300,
      });
    },
  });

  function handleAnimateIn() {
    // --OVERLAY-- //
    overlayAnimation.value = withTiming(1, {
      duration: OVERLAY_TIMING,
    });

    setTimeout(() => {
      // --CONTENT-- //
      contentAnimation.value = withTiming(1, {
        duration: CONTENT_TIMING,
      });
    }, 250);

    // --TRANSLATE-Y-- //
    modalAnimation.value = withSpring(0, {
      stiffness: 360,
      damping: 300,
    });
  };

  function handleAnimateOut() {
    // --OVERLAY-- //
    overlayAnimation.value = withTiming(0, {
      duration: OVERLAY_TIMING,
    });

    // --TRANSLATE-Y-- //
    modalAnimation.value = withSpring(getHeight + 256, {
      stiffness: 256,
      damping: 124,
    });

    setTimeout(() => onCloseModal(), 525);
  };

  function handleOnOverlayPress() {
    if (onOverlayPress) onOverlayPress();

    if (closeOnOverlayPress) handleAnimateOut();
  };

  function handleGetPanGestureValue(gestureValue: any) {
    panGestureAnimatedValue && panGestureAnimatedValue(gestureValue);
  };

  function handleResetAnimationsValues() {
    modalAnimation.value = getHeight;
    overlayAnimation.value = 0;
    contentAnimation.value = 0;
  };

  function handleUnmountComponentWithDelay(amount?: number) {
    setTimeout(() => onCloseModal(), amount || 525);
  };

  useEffect(() => {
    if (!!visible) {
      handleAnimateIn();

      setTimeout(() => setRenderContent(true), 1);
    };

    // --UNMOUNT-- //
    return () => {
      setRenderContent(false);
      handleResetAnimationsValues();
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const backAction = () => {
      onBackButtonPress && onBackButtonPress();

      handleAnimateOut();

      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [visible]);

  return !!visible ? (
    <Portal>
      <ModalSafeAreaView>
        <KeyboardClose keyboardVerticalOffset={-0.1}>
          <View style={[styles({ visible }).root, rootStyle]}>
            {/* --OVERLAY-- */}
            {!!withOverlay && (
              <TouchableWithoutFeedback onPress={handleOnOverlayPress}>
                <Animated.View style={[styles({}).overlay, overlayStyle, overlayAnimatedStyle]} />
              </TouchableWithoutFeedback>
            )}

            {/* --CONTAINER-- */}
            <Animated.View
              style={[
                containerStyle,
                modalAnimatedStyle,
                styles({ height, withBorder, floatingMode, ajustToFullViewport }).container
              ]}
            >
              {/* --HANDLE-- */}
              {withHandle && (
                <PanGestureComponentEnabled
                  onGestureEvent={onGestureEvent}
                  panGestureEnabled={panGestureEnabled}
                >
                  <Animated.View style={styles({}).handle}>
                    <View style={[styles({}).handleIndicator, handleStyle]} />
                  </Animated.View>
                </PanGestureComponentEnabled>
              )}

              {/* --HEADER-- */}
              {withHeader && (
                <PanGestureComponentEnabled
                  onGestureEvent={onGestureEvent}
                  panGestureEnabled={panGestureEnabled}
                >
                  {HeaderComponent ? (
                    <Animated.View style={headerStyle}>
                      {HeaderComponent}
                    </Animated.View>
                  ) : (
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
                  )}
                </PanGestureComponentEnabled>
              )}

              {/* --CONTENT-- */}
              {!!renderContent ? (
                <>
                  {flatListProps ? (
                    <Animated.FlatList
                      ref={flatListRef}
                      {...flatListProps}
                      style={[styles({}).content, flatListStyle, contentAnimatedStyle]}
                    />
                  ) : (
                    <Animated.ScrollView
                      ref={contentRef}
                      style={[styles({}).content, contentStyle, contentAnimatedStyle]}
                    >
                      {children}
                    </Animated.ScrollView>
                  )}
                </>
              ) : <View style={styles({}).content} />}

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
        </KeyboardClose>
      </ModalSafeAreaView>
    </Portal>
  ) : null;
};