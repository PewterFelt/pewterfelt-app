import { supabase } from "@/lib/supabase";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Alert, AppState, Button, StyleSheet, View } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function AuthScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithGitHub() {
    setLoading(true);

    try {
      const redirectUrl = Linking.createURL("/auth/callback");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No authentication URL available");

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUrl,
      );

      if (result.type === "success") {
        const url = result.url;
        const params = url.split("#")[1];

        if (params) {
          const accessToken = new URLSearchParams(params).get("access_token");
          const refreshToken = new URLSearchParams(params).get("refresh_token");

          if (accessToken && refreshToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            router.replace("/(tabs)");
          }
        }
      }
    } catch (error: any) {
      Alert.alert("Authentication Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: "Sign In" }} />
      <View style={styles.container}>
        <View style={styles.verticallySpaced}>
          <Button
            title={loading ? "Loading..." : "Sign in with GitHub"}
            disabled={loading}
            onPress={() => signInWithGitHub()}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
