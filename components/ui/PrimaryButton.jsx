import { View, Text, Pressable, StyleSheet } from "react-native";

const PrimaryButton = ({ children, onPress }) => {
  const pressHandler = () => {
    onPress()
  };
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        // style={styles.buttonInnerContainer}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        } // style for on press event
        onPress={pressHandler}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden'
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
