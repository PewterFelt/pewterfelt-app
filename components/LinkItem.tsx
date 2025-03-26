import { Pressable, Text, View } from "react-native";

type Props = {
  index: number;
  item: any;
  setSelectedLink: (link: any) => void;
};

export const LinkItem = ({ index, item, setSelectedLink }: Props) => {
  return (
    <Pressable key={`right-${index}`} onPress={() => setSelectedLink(item)}>
      <View className="bg-pewter-white dark:bg-white/5 p-4 rounded-lg mb-4">
        <Text className="text-lg font-semibold mb-1 dark:text-pewter-white">
          {item.title || "Untitled Link"}
        </Text>
      </View>
    </Pressable>
  );
};
