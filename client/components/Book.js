import { Text, StyleSheet, Pressable } from "react-native";
import StyleList from "../styles/StyleList";

/* Book card */
export default function Book({ navigation, book }) {
  return (
    <Pressable
      style={styles.book_card}
      onPress={() =>
        navigation.navigate("EditBook", { title: book.title, bookId: book.id })
      }
    >
      {/* book title */}
      <Text style={[styles.book_card__text, styles.book_card__title]}>
        {book.title}
      </Text>
      {/* book author */}
      <Text style={[styles.book_card__text, styles.book_card__author]}>
        {book.author}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  book_card: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: 16,
  },
  book_card__text: {
    color: StyleList.COLOR_LIGHT,
  },
  book_card__title: {
    fontSize: StyleList.SIZE_MEDIUM,
  },
  book_card__author: {
    fontSize: StyleList.SIZE_SMALL,
  },
});
