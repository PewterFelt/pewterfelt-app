import { useSession } from "@/components/providers/SessionProvider";
import { Redirect } from "expo-router";

export default function IndexScreen() {
  const { session, authChecked } = useSession();

  if (!authChecked) return null;

  return <Redirect href={session ? "/(tabs)" : "/auth"} />;
}
