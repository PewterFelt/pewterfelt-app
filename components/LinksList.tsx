import { useSession } from "@/components/providers/SessionProvider";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function LinksList() {
  const { session } = useSession();
  const [links, setLinks] = useState<{ url: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLinks = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("user_link")
        .select("link:link_id(url, title)")
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
    return <ActivityIndicator className="mt-4" color="#f4a261" />;
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
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor="#f4a261"
          colors={["#f4a261"]}
        />
      }
      contentContainerStyle={{
        flexDirection: "row",
        paddingHorizontal: 16,
      }}
    >
      {/* Left Column */}
      <View className="flex-1 mr-2">
        {links
          .filter((_, index) => index % 2 === 0)
          .map((item, index) => (
            <View
              key={`left-${index}`}
              className="bg-neutral-800 p-4 rounded-lg mb-4"
            >
              <Text className="text-white text-lg font-semibold mb-1">
                {item.title || "Untitled Link"}
              </Text>
              <Text className="text-neutral-400">{item.url}</Text>
            </View>
          ))}
      </View>

      {/* Right Column */}
      <View className="flex-1 ml-2">
        {links
          .filter((_, index) => index % 2 === 1)
          .map((item, index) => (
            <View
              key={`right-${index}`}
              className="bg-neutral-800 p-4 rounded-lg mb-4"
            >
              <Text className="text-white text-lg font-semibold mb-1">
                {item.title || "Untitled Link"}
              </Text>
              <Text className="text-neutral-400">{item.url}</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
