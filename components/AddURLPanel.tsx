import { URLInput } from "@/components/URLInput";
import { Check, XCircle } from "phosphor-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGesture,
  TapGesture,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

type Props = {
  headerStyle: { opacity: number };
  containerStyle: { height: number };
  isExpanded: boolean;
  MAX_HEIGHT: number;
  onClose: () => void;
  panGesture: PanGesture;
  tapGesture: TapGesture;
};

export default function AddURLPanel({
  headerStyle,
  containerStyle,
  isExpanded,
  MAX_HEIGHT,
  onClose,
  panGesture,
  tapGesture,
}: Props) {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    setUrl("");
    onClose();
  };

  return (
    <>
      <Animated.View
        className="absolute top-20 left-0 z-10 w-full flex-row items-center justify-center px-2"
        style={headerStyle}
      >
        <Text className="dark:text-neutral-500 text-xl absolute">
          Add a URL link
        </Text>
        <TouchableOpacity
          className="dark:bg-neutral-800 p-2 rounded-full ml-auto"
          onPress={onClose}
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
            <URLInput
              isExpanded={isExpanded}
              MAX_HEIGHT={MAX_HEIGHT}
              value={url}
              onChangeText={setUrl}
            />
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
            onPress={handleSubmit}
          >
            <Check size={24} color="white" weight="bold" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </>
  );
}
