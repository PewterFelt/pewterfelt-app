import { URLInput } from "@/components/URLInput";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_HEIGHT = SCREEN_HEIGHT - 180;
const MIN_HEIGHT = 180;

export default function HomeScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(MIN_HEIGHT);

  const containerStyle = useAnimatedStyle(() => ({
    height: height.value,
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
        height.value = withSpring(MIN_HEIGHT, { damping: 20, stiffness: 200 });

        runOnJS(setIsExpanded)(false);
      } else {
        height.value = withSpring(MAX_HEIGHT, {
          damping: 20,
          stiffness: 200,
        });

        runOnJS(setIsExpanded)(true);
      }
    });

  const tapGesture = Gesture.Tap().onStart(() => {
    if (!isExpanded) {
      height.value = withSpring(MAX_HEIGHT, { damping: 20, stiffness: 200 });

      runOnJS(setIsExpanded)(true);
    }
  });

  return (
    <GestureHandlerRootView className="flex-1 bg-gray-700">
      <GestureDetector gesture={Gesture.Simultaneous(tapGesture, panGesture)}>
        <Animated.View
          className="absolute bottom-0 left-0 right-0 bg-gray-800 mx-2 rounded-t-2xl p-4 pt-2 shadow-top"
          style={[containerStyle, { zIndex: 1 }]}
        >
          <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-3 mt-1" />

          {isExpanded && (
            <TouchableOpacity
              className="absolute top-4 right-4 z-10 p-2"
              onPress={() => {
                height.value = withSpring(MIN_HEIGHT, {
                  damping: 20,
                  stiffness: 200,
                });
                setIsExpanded(false);
              }}
            >
              <FontAwesome name="close" size={24} color="gray" />
            </TouchableOpacity>
          )}

          {isExpanded && (
            <URLInput isExpanded={isExpanded} MAX_HEIGHT={MAX_HEIGHT} />
          )}

          {!isExpanded && (
            <Text className="absolute left-4 top-4 text-gray-400 text-base">
              Tap to expand
            </Text>
          )}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
