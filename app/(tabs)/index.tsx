import LinksList from "@/components/LinksList";
import { URLInput } from "@/components/URLInput";
import { Check, XCircle } from "phosphor-react-native";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function HomeScreen() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const MAX_HEIGHT = SCREEN_HEIGHT - 130;
  const MIN_HEIGHT = 180;
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
    opacity: interpolate(height.value, [MIN_HEIGHT, MAX_HEIGHT], [1, 0]),
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
    <GestureHandlerRootView className="flex-1 bg-neutral-900">
      <Animated.View className="flex-1 pt-20 px-4" style={contentStyle}>
        <LinksList />
      </Animated.View>

      <Animated.View
        className="absolute top-20 left-0 z-10 w-full flex-row items-center justify-center px-2"
        style={headerStyle}
      >
        <Text className="dark:text-neutral-500 text-xl absolute">
          Add a URL link
        </Text>
        <TouchableOpacity
          className="dark:bg-neutral-800 p-2 rounded-full ml-auto"
          onPress={() => {
            height.value = withSpring(MIN_HEIGHT, SPRING_CONFIG);

            runOnJS(setIsExpanded)(false);
          }}
        >
          <XCircle size={24} color="#f4a261" weight="duotone" />
        </TouchableOpacity>
      </Animated.View>

      <GestureDetector gesture={Gesture.Simultaneous(tapGesture, panGesture)}>
        <Animated.View
          className="absolute z-10 bottom-0 left-0 right-0 mx-2 rounded-t-2xl p-4 pt-2 shadow-top dark:bg-neutral-800"
          style={containerStyle}
        >
          <View className="w-10 h-1 rounded-full self-center mb-3 mt-1 bg-pewter-gray" />

          {isExpanded && (
            <URLInput isExpanded={isExpanded} MAX_HEIGHT={MAX_HEIGHT} />
          )}

          {!isExpanded && (
            <Text className="absolute left-4 top-4 text-gray-400 text-base">
              Add a URL link
            </Text>
          )}
        </Animated.View>
      </GestureDetector>

      {isExpanded && (
        <KeyboardAvoidingView
          className="absolute bottom-4 right-4 z-10"
          behavior="padding"
        >
          <TouchableOpacity
            className="bg-pewter-orange rounded-full py-2 px-4 mb-4"
            onPress={() => null}
          >
            <Check size={24} color="white" weight="bold" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </GestureHandlerRootView>
  );
}
