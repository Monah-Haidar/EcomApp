// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import LottieView from 'lottie-react-native';
// import Animated, {
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';

// interface AnimatedRefreshControlProps {
//   refreshing: boolean;
//   onRefresh: () => void;
//   animationSource: any;
//   refreshTriggerHeight: number;
// }

// const AnimatedRefreshControl: React.FC<AnimatedRefreshControlProps> = ({
//   refreshing,
//   onRefresh,
//   animationSource,
//   refreshTriggerHeight = 100,
// }) => {
//   const lottieRef = React.useRef<LottieView>(null);
//   const scrollY = useSharedValue(0);
//   const isRefreshing = useSharedValue(false);

//   React.useEffect(() => {
//     isRefreshing.value = refreshing;
//     if (refreshing) {
//       lottieRef.current?.play();
//     } else {
//       lottieRef.current?.pause();
//     }
//   }, [refreshing, isRefreshing]);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       // Only update if we're not already refreshing
//       if (!isRefreshing.value) {
//         scrollY.value = event.contentOffset.y;
//       }
//     },
//     onEndDrag: () => {
//       if (scrollY.value < -refreshTriggerHeight && !isRefreshing.value) {
//         onRefresh();
//       }
//     },
//   });

//   const animatedStyle = useAnimatedStyle(() => {
//     const translateY = isRefreshing.value
//       ? withTiming(refreshTriggerHeight / 2)
//       : withTiming(Math.min(0, scrollY.value));

//     return {
//       transform: [{ translateY }],
//     };
//   });

//   const refresherStyle = useAnimatedStyle(() => {
//     return {
//       height: refreshTriggerHeight,
//       opacity: isRefreshing.value
//         ? withTiming(1)
//         : withTiming(Math.min(1, Math.abs(scrollY.value / refreshTriggerHeight))),
//     };
//   });

//   return (
//     <Animated.ScrollView
//       onScroll={scrollHandler}
//       scrollEventThrottle={16}
//       contentContainerStyle={styles.scrollContainer}
//       showsVerticalScrollIndicator={false}>
//       <Animated.View style={[styles.refreshContainer, refresherStyle]}>
//         <LottieView
//           ref={lottieRef}
//           source={animationSource}
//           style={styles.lottieView}
//           loop
//         />
//       </Animated.View>
//       <Animated.View style={animatedStyle}>
//         {/* Content will be injected here */}
//         {props.children}
//       </Animated.View>
//     </Animated.ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   refreshContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//   },
//   lottieView: {
//     width: 100,
//     height: 100,
//   },
// });

// export default AnimatedRefreshControl;

import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedRefreshControlProps {
  refreshing: boolean;
  onRefresh: () => void;
  refreshTriggerHeight?: number;
  children: React.ReactNode;
}

const AnimatedRefreshControl: React.FC<AnimatedRefreshControlProps> = ({
  refreshing,
  onRefresh,
  refreshTriggerHeight = 80,
  children,
}) => {
  const scrollY = useSharedValue(0);
  const isRefreshing = useSharedValue(false);

  React.useEffect(() => {
    isRefreshing.value = refreshing;
  }, [refreshing]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (!isRefreshing.value) {
        scrollY.value = event.contentOffset.y;
      }
    },
    onEndDrag: () => {
      if (scrollY.value < -refreshTriggerHeight && !isRefreshing.value) {
        onRefresh();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = isRefreshing.value
      ? withTiming(refreshTriggerHeight / 2)
      : withTiming(Math.min(0, scrollY.value));

    return {
      transform: [{ translateY }],
    };
  });

  const refresherStyle = useAnimatedStyle(() => {
    return {
      height: refreshTriggerHeight,
      opacity: isRefreshing.value
        ? withTiming(1)
        : withTiming(Math.min(1, Math.abs(scrollY.value / refreshTriggerHeight))),
    };
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.refreshContainer, refresherStyle]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Animated.View>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  refreshContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default AnimatedRefreshControl;