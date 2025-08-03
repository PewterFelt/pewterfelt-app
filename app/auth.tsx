import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { Router, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Button, Platform, View } from "react-native";

import { supabase } from "@/lib/supabase";

if (Platform.OS === "web") WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri({ path: "auth/callback" });

const createSessionFromUrl = async (url: string) => {
  const {
    params: { access_token, refresh_token },
    errorCode,
  } = QueryParams.getQueryParams(url);
  if (errorCode) throw new Error(errorCode);
  if (!access_token || !refresh_token) throw new Error("Missing access token");

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;

  return data.session;
};

const performOAuth = (router: Router) => async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo,
  );

  if (res.type === "success") {
    const { url } = res;
    const session = await createSessionFromUrl(url);
    if (!session) throw new Error("Failed to create session");

    router.replace("/(tabs)");
  }
};

export default function Auth() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center">
      <Button onPress={performOAuth(router)} title="Sign in with Github" />
    </View>
  );
}
