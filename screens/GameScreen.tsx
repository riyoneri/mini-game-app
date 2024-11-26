import { StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";

interface GameScreenProperties {
  userNumber: number;
}

function generateRandomBetween(min: number, max: number, exclude: number) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) return generateRandomBetween(min, max, exclude);

  return randomNumber;
}

export default function GameScreen({ userNumber }: GameScreenProperties) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        {/* + - */}
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
