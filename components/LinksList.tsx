import { useSession } from "@/components/providers/SessionProvider";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { LinkItem } from "./LinkItem";
import { LinkModal } from "./LinkModal";

type Props = {
  contentStyle: { opacity: number };
};

export default function LinksList({ contentStyle }: Props) {
  const { session } = useSession();
  const [links, setLinks] = useState<{ url: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLink, setSelectedLink] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const fetchLinks = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("user_link")
        .select("link:link_id(url, title, tags, favicon, thumbnail)")
        .eq("user_id", session.user.id);

      if (error) throw error;

      setLinks((data as any).map((item: any) => item.link));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchLinks();
  };
  if (loading) {
    return <ActivityIndicator className="mt-4" color={Colors["orange"]} />;
  }

  if (error) {
    return <Text className="text-red-500 text-center">{error}</Text>;
  }

  if (links.length === 0) {
    return (
      <Text className="text-neutral-500 text-center mt-4">
        No links found. Add your first one below!
      </Text>
    );
  }

  return (
    <Animated.View className="flex-1 pt-20 px-4" style={contentStyle}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors["orange"]}
            colors={[Colors["orange"]]}
          />
        }
        contentContainerStyle={{
          flexDirection: "row",
        }}
      >
        {/* Left Column */}
        <View className="flex-1 mr-2">
          {links
            .filter((_, index) => index % 2 === 0)
            .map((item, index) => (
              <LinkItem
                key={`left-${index}`}
                index={index}
                item={item}
                setSelectedLink={setSelectedLink}
              />
            ))}
        </View>

        {/* Right Column */}
        <View className="flex-1 ml-2">
          {links
            .filter((_, index) => index % 2 === 1)
            .map((item, index) => (
              <LinkItem
                key={`right-${index}`}
                index={index}
                item={item}
                setSelectedLink={setSelectedLink}
              />
            ))}
        </View>
      </ScrollView>

      <LinkModal
        selectedLink={selectedLink}
        setSelectedLink={setSelectedLink}
      />
    </Animated.View>
  );
}
