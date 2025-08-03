import { Redirect } from "expo-router";

import { useSession } from "@/components/providers/SessionProvider";

export default function IndexScreen() {
  const { session, authChecked } = useSession();

  if (!authChecked) return null;

  return <Redirect href={session ? "/(tabs)" : "/auth"} />;
}
