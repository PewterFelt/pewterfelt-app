import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
const MAX_HEIGHT = SCREEN_HEIGHT - 80; // Leave 80px margin at bottom
const MIN_HEIGHT = 180;

export default function HomeScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(MIN_HEIGHT);

  // Handle expansion state changes
  const setExpandedState = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  // Animation styles
  const containerStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  // Gesture handling
  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationY < 0) return; // Only allow dragging down
      // Directly control height based on drag distance
      height.value = Math.max(MIN_HEIGHT, MAX_HEIGHT - event.translationY);
    })
    .onEnd((event) => {
      if (event.translationY > 100 || event.velocityY > 500) {
        height.value = withSpring(MIN_HEIGHT, { damping: 20, stiffness: 200 });
        runOnJS(setExpandedState)(false);
      } else {
        height.value = withSpring(MAX_HEIGHT, {
          damping: 20,
          stiffness: 200,
        });
        runOnJS(setExpandedState)(true);
      }
    });

  // Tap gesture for expanding
  const tapGesture = Gesture.Tap().onStart(() => {
    if (!isExpanded) {
      height.value = withSpring(MAX_HEIGHT, { damping: 20, stiffness: 200 });
      runOnJS(setExpandedState)(true);
    }
  });

  return (
    <GestureHandlerRootView className="flex-1">
      <GestureDetector gesture={Gesture.Simultaneous(tapGesture, panGesture)}>
        <Animated.View
          className="absolute bottom-0 left-0 right-0 bg-gray-800 rounded-t-2xl p-4 pt-2 shadow-top"
          style={[containerStyle, { zIndex: 1 }]}
        >
          {/* Drag handle indicator */}
          <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-3" />

          {/* Close button */}
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

          {/* Text input */}
          <View className="flex-1">
            <TextInput
              className="text-base leading-6"
              multiline
              placeholder="Start typing..."
              placeholderTextColor={isExpanded ? "#9CA3AF" : "transparent"}
              editable={isExpanded}
              autoFocus={isExpanded}
              pointerEvents={isExpanded ? "auto" : "none"}
              style={{
                textAlignVertical: "top",
                // Prevent input from pushing content up
                maxHeight: MAX_HEIGHT - 100, // Adjust based on your header height
              }}
            />
          </View>

          {/* Hint text when collapsed */}
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
