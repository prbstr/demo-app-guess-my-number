import { StyleSheet, Image, View } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";

const GameOverScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden", // hides squareness of photo, uses the views border instead
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default GameOverScreen;
