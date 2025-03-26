import { View, TextInput } from "react-native";

type Props = {
  isExpanded: boolean;
  MAX_HEIGHT: number;
  value: string;
  onChangeText: (text: string) => void;
};

export const URLInput = ({ 
  isExpanded, 
  MAX_HEIGHT,
  value,
  onChangeText 
}: Props) => {
  return (
    <View className="flex-1">
      <TextInput
        className="leading-6"
        multiline
        placeholder="Start typing..."
        placeholderTextColor={isExpanded ? "#9CA3AF" : "transparent"}
        editable={isExpanded}
        autoFocus
        pointerEvents={isExpanded ? "auto" : "none"}
        style={{
          textAlignVertical: "top",
          // Prevent input from pushing content up
          maxHeight: MAX_HEIGHT - 100, // Adjust based on your header height
        }}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
