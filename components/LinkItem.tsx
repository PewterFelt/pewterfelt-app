import { Pressable, Text, View, Image } from "react-native";

type Props = {
  index: number;
  item: any;
  setSelectedLink: (link: any) => void;
};

export const LinkItem = ({ index, item, setSelectedLink }: Props) => {
  return (
    <Pressable key={`right-${index}`} onPress={() => setSelectedLink(item)}>
      {item.thumbnail ? (
        <View className="">
          {item.thumbnail && (
            <View className="overflow-hidden h-44 rounded-lg">
              <Image
                source={{ uri: item.thumbnail }}
                className="w-full rounded-t-lg h-full object-cover"
                accessibilityLabel={item.title || "Link thumbnail"}
              />
            </View>
          )}
          <View className="pt-1 pb-4">
            <Text
              numberOfLines={1}
              className="text-sm font-medium mb-1 dark:text-pewter-white text-gray-400"
            >
              {item.title || item.url}
            </Text>
          </View>
        </View>
      ) : (
        <View className="bg-pewter-white dark:bg-white/5 rounded-lg mb-4 overflow-hidden">
          <View className="p-4">
            <Text className="text-md font-semibold mb-1 dark:text-pewter-white">
              {item.title || item.url}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};
