import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useCallback } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOver";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGame";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [route, setRoute] = useState();
  const [userNumber, setUserNumber] = useState();
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [fontsLoaded, fontError] = Font.useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const onPickNumberHandler = (pickedNumber) => {
    setRoute(1);
    setUserNumber(pickedNumber);
  };

  const onGameOverHandler = () => {
    setRoute(2);
  };

  const startNewGameHandler = () => {
    setNumberOfRounds(0);
    setRoute(0);
  };

  let screen = <StartGameScreen onPickNumber={onPickNumberHandler} />;

  if (route === 1) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        setNumberOfRounds={setNumberOfRounds}
        onGameOverHandler={onGameOverHandler}
      />
    );
  } else if (route === 2) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        numberOfRounds={numberOfRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        style={styles.container}
        imageStyle={styles.backgroundImage}
        source={require("./assets/dice.jpg")}
        resizeMode="cover"
      >
        <SafeAreaView>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.accent500,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
