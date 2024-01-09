import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOver";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGame";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [route, setRoute] = useState();
  const [userNumber, setUserNumber] = useState();
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const onPickNumberHandler = (pickedNumber) => {
    setRoute(1);
    setUserNumber(pickedNumber);
  };

  const onGameOverHandler = () => {
    setRoute(2);
  };

  let screen = <StartGameScreen onPickNumber={onPickNumberHandler} />;

  if (route === 1) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOverHandler={onGameOverHandler}
      />
    );
  } else if (route === 2) {
    screen = <GameOverScreen />;
    setTimeout(() => setRoute(0), 3000);
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.container}
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
    backgroundColor: Colors.accent500,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
