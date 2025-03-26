import React from "react";
import { Modal, View, Pressable, Text } from "react-native";

type Props = {
  selectedLink: any;
  setSelectedLink: any;
};

export const LinkModal = ({ selectedLink, setSelectedLink }: Props) => {
  return (
    <Modal
      visible={!!selectedLink}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setSelectedLink(null)}
    >
      <View className="bg-pewter-gray/5 dark:bg-pewter-black p-6 h-full">
        <Text className="dark:text-white text-xl font-bold mb-4">
          {selectedLink?.title || "Untitled Link"}
        </Text>
        <Text className="text-neutral-400 break-words mb-6">
          {selectedLink?.url}
        </Text>
        <Pressable
          onPress={() => setSelectedLink(null)}
          className="bg-pewter-orange p-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};
