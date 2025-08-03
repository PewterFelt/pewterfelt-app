import { useState } from "react";
import { Dimensions } from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import AddURLPanel from "@/components/AddURLPanel";
import LinksList from "@/components/LinksList";

export default function HomeScreen() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const MAX_HEIGHT = SCREEN_HEIGHT - 210;
  const MIN_HEIGHT = 60;
  const SPRING_CONFIG = {
    damping: 20,
    stiffness: 200,
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(MIN_HEIGHT);

  const containerStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(height.value, [MIN_HEIGHT, MAX_HEIGHT], [0, 1]),
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      height.value,
      [MIN_HEIGHT, (MAX_HEIGHT * 2) / 3],
      [1, 0],
    ),
  }));

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (!isExpanded) {
        height.value = MIN_HEIGHT - event.translationY;
      } else {
        height.value = MAX_HEIGHT - event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100 || event.velocityY > 500) {
        height.value = withSpring(MIN_HEIGHT, SPRING_CONFIG);

        runOnJS(setIsExpanded)(false);
      } else {
        height.value = withSpring(MAX_HEIGHT, SPRING_CONFIG);

        runOnJS(setIsExpanded)(true);
      }
    });

  const tapGesture = Gesture.Tap().onStart(() => {
    if (!isExpanded) {
      height.value = withSpring(MAX_HEIGHT, SPRING_CONFIG);

      runOnJS(setIsExpanded)(true);
    }
  });

  return (
    <GestureHandlerRootView className="flex-1 bg-pewter-gray/5 dark:bg-pewter-black">
      <LinksList contentStyle={contentStyle} />

      <AddURLPanel
        headerStyle={headerStyle}
        containerStyle={containerStyle}
        isExpanded={isExpanded}
        MAX_HEIGHT={MAX_HEIGHT}
        onClose={() => {
          height.value = withSpring(MIN_HEIGHT, SPRING_CONFIG);
          runOnJS(setIsExpanded)(false);
        }}
        panGesture={panGesture}
        tapGesture={tapGesture}
      />
    </GestureHandlerRootView>
  );
}
