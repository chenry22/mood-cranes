import { useAuth } from "@/services/useAuth";
import { Redirect, Slot, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
      user ? (
        <Redirect href="/mood" />
      ) : (
        <Redirect href="/login" />
      )
  );
}
