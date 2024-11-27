import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useRef, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

interface GameScreenProperties {
  userNumber: number;
}

function generateRandomBetween(min: number, max: number, exclude: number) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) return generateRandomBetween(min, max, exclude);

  return randomNumber;
}

// let minBoundary = 1;
// let maxBoundary = 100;

export default function GameScreen({ userNumber }: GameScreenProperties) {
  const minBoundary = useRef(1);
  const maxBoundary = useRef(100);

  const initialGuess = generateRandomBetween(
    minBoundary.current,
    maxBoundary.current,
    userNumber
  );

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction: "lower" | "greater") {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { style: "cancel", text: "Cancel" },
      ]);
      return;
    }

    if (direction === "lower") maxBoundary.current = currentGuess;
    else minBoundary.current = currentGuess + 1;

    const nextGuess = generateRandomBetween(
      minBoundary.current,
      maxBoundary.current,
      currentGuess
    );

    setCurrentGuess(nextGuess);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <PrimaryButton onPress={() => nextGuessHandler("lower")}>
          -
        </PrimaryButton>
        <PrimaryButton onPress={() => nextGuessHandler("greater")}>
          +
        </PrimaryButton>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 50,
  },
});
