import {
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import Book from "../components/Book";
import useGetBooks from "../hooks/useGetBooks";
import { mainStyles } from "../styles/MainStyles";
import StyleList from "../styles/StyleList";

export default function Main({ navigation }) {
  // GET /books hook
  const { books, loading } = useGetBooks();

  return (
    <SafeAreaView style={mainStyles.container}>
      {/* book list */}
      <ScrollView style={styles.book_list}>
        {loading ? (
          <Text style={mainStyles.text_loading}>Cargando...</Text>
        ) : (
          books &&
          books.map((book, i) => (
            <Book navigation={navigation} book={book} key={i} />
          ))
        )}
      </ScrollView>
      {/* add book button */}
      <Pressable
        style={styles.add_button}
        onPress={() => navigation.navigate("CreateBook")}
      >
        <Text style={styles.add_button__text}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  book_list: {
    width: "100%",
  },
  add_button: {
    width: 80,
    height: 80,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: StyleList.COLOR_PRIMARY,
  },
  add_button__text: {
    fontSize: StyleList.SIZE_BIG,
    fontWeight: "bold",
    color: StyleList.COLOR_DARK,
  },
});
