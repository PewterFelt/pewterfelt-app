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

import { URLInput } from "@/components/URLInput";
import { Colors } from "@/constants/Colors";

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
        className="absolute left-0 top-20 z-10 w-full flex-row items-center justify-center px-2"
        style={headerStyle}
      >
        <Text className="absolute text-xl dark:text-pewter-gray">
          Add a URL link
        </Text>
        <TouchableOpacity
          className="ml-auto rounded-full bg-pewter-white p-2 dark:bg-pewter-black"
          onPress={onClose}
        >
          <XCircle size={24} color={Colors["orange"]} weight="duotone" />
        </TouchableOpacity>
      </Animated.View>

      <GestureDetector gesture={Gesture.Simultaneous(tapGesture, panGesture)}>
        <Animated.View
          className="absolute bottom-[80px] left-0 right-0 z-10 mx-2 -translate-y-2 transform rounded-2xl bg-pewter-white p-4 pt-2 dark:bg-white/5"
          style={containerStyle}
        >
          <View className="mb-3 mt-1 h-1 w-10 self-center rounded-full bg-pewter-orange" />

          {Boolean(isExpanded) && (
            <URLInput
              isExpanded={isExpanded}
              MAX_HEIGHT={MAX_HEIGHT}
              value={url}
              onChangeText={setUrl}
            />
          )}

          {!isExpanded && (
            <Text className="absolute left-4 top-4 text-base text-gray-400">
              Add a URL link
            </Text>
          )}
        </Animated.View>
      </GestureDetector>

      {Boolean(isExpanded) && (
        <KeyboardAvoidingView
          className="absolute bottom-4 right-4 z-10"
          behavior="padding"
        >
          <TouchableOpacity
            className="mb-4 rounded-full bg-pewter-orange px-4 py-2"
            onPress={handleSubmit}
          >
            <Check size={24} color="white" weight="bold" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </>
  );
}
