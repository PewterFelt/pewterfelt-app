/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

import { useSession } from "@/components/providers/SessionProvider";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

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
        .from("user_links")
        .select("links:link_id(url, title, favicon, thumbnail)")
        .eq("user_id", session.user.id);

      if (error) throw error;

      console.log(data);

      setLinks((data as any).map((item: any) => item.links));
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
    return <Text className="text-center text-red-500">{error}</Text>;
  }

  if (links.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-neutral-500">
          No links found. Add your first one below!
        </Text>
      </View>
    );
  }

  return (
    <Animated.View className="flex-1 px-4 pt-20" style={contentStyle}>
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
        <View className="mr-2 flex-1">
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
        <View className="ml-2 flex-1">
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
