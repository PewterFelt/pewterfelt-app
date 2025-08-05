import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

import { Link } from "./LinksList";

type Props = {
  selectedLink: Link | null;
  setSelectedLink: (link: Link | null) => void;
};

export const LinkModal = ({ selectedLink, setSelectedLink }: Props) => {
  return (
    <Modal
      visible={!!selectedLink}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setSelectedLink(null)}
    >
      <View className="h-full bg-pewter-gray/5 py-6 dark:bg-pewter-black">
        <View className="px-6">
          <Text className="mb-4 text-xl font-bold dark:text-white">
            {selectedLink?.title || "Untitled Link"}
          </Text>
          <Text className="mb-6 break-words text-neutral-400">
            {selectedLink?.url}
          </Text>
        </View>
        {Boolean(selectedLink?.content) && (
          <ScrollView className="flex-1 px-6">
            <Markdown>{selectedLink?.content}</Markdown>
          </ScrollView>
        )}
        <View className="px-6">
          <Pressable
            onPress={() => setSelectedLink(null)}
            className="rounded-lg bg-pewter-orange p-3"
          >
            <Text className="text-center font-semibold text-white">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
