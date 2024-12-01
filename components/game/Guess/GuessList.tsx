import { FlatList, StyleSheet, View } from "react-native";
import { Guess } from "../../../App";
import GuessListItem from "./GuessListItem";

interface GuessListProperties {
  allGuess: Guess[];
}

export default function GuessList({ allGuess }: GuessListProperties) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={allGuess}
        renderItem={(guess) => <GuessListItem {...guess.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    gap: 30,
    width: "100%",
  },
  listContent: { gap: 15 },
});
