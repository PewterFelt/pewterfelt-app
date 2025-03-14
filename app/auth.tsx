import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, Button } from "react-native";
import { Stack } from "expo-router";
import { supabase } from "@/lib/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function AuthScreen() {
  const [loading, setLoading] = useState(false);

  async function signInWithGitHub() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
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
    justifyContent: 'center',
    padding: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
