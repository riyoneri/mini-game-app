import { StyleSheet, Text, View } from "react-native";
import { Guess } from "../../../App";
import Colors from "../../../constants/colors";

export default function GuessListItem({ id, value }: Guess) {
  return (
    <View style={styles.container}>
      <Text>#{id}</Text>
      <View style={styles.guessValue}>
        <Text>Opponent's Guess: </Text>
        <Text>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent500,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.primary600,
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  guessValue: {
    flexDirection: "row",
    alignItems: "center",
  },
});
