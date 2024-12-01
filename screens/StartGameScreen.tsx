import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";

interface StartGameScreenProperties {
  onSelectNumber: (selectedNumber: string) => void;
}

export default function StartGameScreen({
  onSelectNumber,
}: StartGameScreenProperties) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredText: string) {
    setEnteredNumber(enteredText);
  }

  function confirmInputHandler() {
    const chosenNumber = Number(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );

      return;
    }

    onSelectNumber(`${chosenNumber}`);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View
          style={[styles.screenContainer, { marginTop: marginTopDistance }]}
        >
          <Title>Guess My Number</Title>
          <Card title="Enter a Number">
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContainer: {
    // marginTop: 100,
    gap: 34,
    alignItems: "center",
  },
  numberInput: {
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignContent: "stretch",
  },
  buttonContainer: {
    flex: 1,
  },
});
