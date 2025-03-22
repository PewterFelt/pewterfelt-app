import { TextInput, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="relative h-screen">
      <TextInput
        className="absolute bottom-[80px] left-0 w-full p-4"
        placeholder="placeholder"
      />
    </View>
  );
}
