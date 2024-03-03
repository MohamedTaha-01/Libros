import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: StyleList.COLOR_DARK,
  },
  text_loading: {
    padding: 32,
    textAlign: "center",
    color: StyleList.COLOR_LIGHT,
    fontSize: StyleList.SIZE_SMALL,
  },
  label: {
    width: "100%",
    fontSize: StyleList.SIZE_SMALL,
    color: StyleList.COLOR_LIGHT,
    marginTop: StyleList.SIZE_BIG,
    marginBottom: StyleList.SIZE_SMALL,
  },
  label_error: {
    width: "100%",
    fontSize: StyleList.SIZE_SMALL,
    color: StyleList.COLOR_RED,
    marginBottom: StyleList.SIZE_SMALL,
  },
  input: {
    width: "100%",
    fontSize: StyleList.SIZE_MEDIUM,
    color: StyleList.COLOR_LIGHT,
    borderBottomWidth: 1,
    borderBottomColor: StyleList.COLOR_LIGHT,
  },
});
