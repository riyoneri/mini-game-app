import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useRef, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import { Guess } from "../App";
import GuessList from "../components/game/Guess/GuessList";
import { Ionicons } from "@expo/vector-icons";

interface GameScreenProperties {
  userNumber: number;
  onGameOver: () => void;
  onAddGuess: (guessedValue: string) => void;
  allGuess: Guess[];
}

function generateRandomBetween(min: number, max: number, exclude: number) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) return generateRandomBetween(min, max, exclude);

  return randomNumber;
}

export default function GameScreen({
  userNumber,
  onAddGuess,
  onGameOver,
  allGuess,
}: GameScreenProperties) {
  const minBoundary = useRef(1);
  const maxBoundary = useRef(100);

  const initialGuess = generateRandomBetween(1, 100, userNumber);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver();
  }, [currentGuess, userNumber, onGameOver]);

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

    onAddGuess(String(currentGuess));

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
      <Card title="Higher or lower?" style={styles.card}>
        <PrimaryButton
          style={styles.button}
          onPress={() => nextGuessHandler("lower")}
        >
          <Ionicons name="remove" size={30} />
        </PrimaryButton>
        <PrimaryButton
          style={styles.button}
          onPress={() => nextGuessHandler("greater")}
        >
          <Ionicons name="add" size={30} />
        </PrimaryButton>
      </Card>
      <GuessList allGuess={allGuess} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 30,
  },
  card: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
