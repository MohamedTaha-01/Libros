import { StyleSheet, Pressable, Text } from "react-native";
import StyleList from "../styles/StyleList";

export default function FormButton({ text, pressFunction, color }) {
  return (
    <Pressable
      style={{ ...styles.form_button, backgroundColor: color }}
      onPress={pressFunction}
    >
      <Text style={styles.form_button__text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  form_button: {
    width: "100%",
    marginTop: StyleList.SIZE_BIG,
    padding: StyleList.SIZE_SMALL,
    borderRadius: 50,
    backgroundColor: StyleList.COLOR_PRIMARY,
  },
  form_button__text: {
    textAlign: "center",
    color: StyleList.COLOR_DARK,
    fontSize: StyleList.SIZE_MEDIUM,
    fontWeight: "bold",
  },
});
