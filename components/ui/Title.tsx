import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

export default function Title({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
    width: 300,
    maxWidth: "80%",
  },
});
