import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // shadow for Android
    elevation: 4,
    // shadow for iOS
    shadowColor: "black", // shadow color
    shadowOffset: { width: 0, height: 2 }, // offset from top and left shadow should be from original
    shadowRadius: 6, // corners
    shadowOpacity: 0.25, // strength of shadow
  },
});

export default Card;
