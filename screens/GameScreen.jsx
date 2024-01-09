import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";
import Card from "../components/ui/Card";
import { Ionicons } from "@expo/vector-icons";

const generateRandomNumberBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOverHandler }) => {
  const initialGuess = generateRandomNumberBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOverHandler();
    }
  }, [currentGuess, userNumber, onGameOverHandler]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 1 && currentGuess < userNumber) ||
      (direction === 2 && currentGuess > userNumber)
    ) {
      Alert.alert("Liar", "You are playing", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === 1) {
      maxBoundary = currentGuess;
    } else if (direction === 2) {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomNumberBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
    setGuesses([...guesses, newRandomNumber]);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText>Higher or Lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(1)}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
            <PrimaryButton onPress={() => nextGuessHandler(2)}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View>
        {guesses.map((guess) => {
          return (
            <Text key={guess} style={styles.guessText}>
              The computer has guessed {guess}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 24,
  },
  guessText: {
    fontSize: 24,
    color: Colors.primary700,
  },
  buttonContainer: {},
  buttonsContainer: {},
});

export default GameScreen;
