import { Image, Pressable, Text, View } from "react-native";

import { Link } from "./LinksList";

type Props = {
  index: number;
  item: Link;
  setSelectedLink: (link: Link) => void;
};

export const LinkItem = ({ index, item, setSelectedLink }: Props) => {
  return (
    <Pressable key={`right-${index}`} onPress={() => setSelectedLink(item)}>
      {item?.thumbnail ? (
        <View className="">
          {item.thumbnail && (
            <View className="h-44 overflow-hidden rounded-lg">
              <Image
                source={{ uri: item.thumbnail }}
                className="h-full w-full rounded-t-lg object-cover object-center"
                accessibilityLabel={item.title || "Link thumbnail"}
              />
            </View>
          )}
          <View className="pb-4 pt-1">
            <Text
              numberOfLines={1}
              className="mb-1 text-sm font-medium text-gray-400 dark:text-pewter-white"
            >
              {item.title || item.url}
            </Text>
          </View>
        </View>
      ) : (
        <View className="mb-4 overflow-hidden rounded-lg bg-pewter-white dark:bg-white/5">
          <View className="p-4">
            <Text className="text-md mb-1 font-semibold dark:text-pewter-white">
              {item?.title || item?.url}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};
