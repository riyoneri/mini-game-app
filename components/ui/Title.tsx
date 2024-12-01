import { PropsWithChildren } from "react";
import { StyleSheet, Text, Platform } from "react-native";

export default function Title({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: "white",
    textAlign: "center",
    borderWidth: Platform.select({ android: 2, ios: 0 }),
    borderColor: "white",
    padding: 12,
    width: 300,
    maxWidth: "80%",
  },
});
