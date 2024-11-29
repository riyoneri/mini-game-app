import { View, TextInput, Text, StyleSheet, ViewStyle } from "react-native";
import PrimaryButton from "./PrimaryButton";
import Colors from "../../constants/colors";
import { PropsWithChildren } from "react";

interface CardProperties {
  title: string;
  style?: ViewStyle;
}

export default function Card({
  title,
  children,
  style,
}: PropsWithChildren<CardProperties>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={style ?? styles.children}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: "center",
    gap: 10,
  },
  title: {
    color: Colors.accent500,
    fontSize: 25,
    fontFamily: "open-sans",
  },
  children: {
    alignItems: "center",
  },
});
