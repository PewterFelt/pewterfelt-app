import { Modal, Pressable, Text, View } from "react-native";

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
      <View className="h-full bg-pewter-gray/5 p-6 dark:bg-pewter-black">
        <Text className="mb-4 text-xl font-bold dark:text-white">
          {selectedLink?.title || "Untitled Link"}
        </Text>
        <Text className="mb-6 break-words text-neutral-400">
          {selectedLink?.url}
        </Text>
        <Text></Text>
        <Pressable
          onPress={() => setSelectedLink(null)}
          className="rounded-lg bg-pewter-orange p-3"
        >
          <Text className="text-center font-semibold text-white">Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};
