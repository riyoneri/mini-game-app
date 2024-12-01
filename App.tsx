import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

export interface Guess {
  id: string;
  value: string;
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessedNumbers, setGuessedNumbers] = useState<Guess[]>([]);

  const [isFontLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  function pickedNumberHandler(pickedNumber: string) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function addGuessHandler(guessedValue: string) {
    setGuessedNumbers((previousGuessedNumbers) => [
      { id: `${previousGuessedNumbers.length + 1}`, value: guessedValue },
      ...previousGuessedNumbers,
    ]);
  }

  function startNewGameHandler() {
    setUserNumber("");
    setGuessedNumbers([]);
  }

  const onLayoutRootView = useCallback(() => {
    if (isFontLoaded) {
      SplashScreen.hide();
    }
  }, [isFontLoaded]);

  if (!isFontLoaded) {
    return null;
  }

  let screen = <StartGameScreen onSelectNumber={pickedNumberHandler} />;

  if (userNumber)
    screen = (
      <GameScreen
        userNumber={Number(userNumber)}
        onGameOver={() => setGameIsOver(true)}
        onAddGuess={addGuessHandler}
        allGuess={guessedNumbers}
      />
    );

  if (userNumber && gameIsOver)
    screen = (
      <GameOverScreen
        roundsNumber={guessedNumbers.length}
        onStartNewGame={startNewGameHandler}
        userNumber={Number(userNumber)}
      />
    );

  if (!isFontLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
