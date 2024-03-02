import {
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import Book from "../components/Book";
import StyleList from "../styles/StyleList";
import { useIsFocused } from "@react-navigation/native";

export default function Main({ navigation }) {
  const [books, setBooks] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  // make GET /books request
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.40:3000/books");
      const result = await response.json();
      setBooks(result || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // fetch books
  useEffect(() => {
    fetchBooks();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {/* book list */}
      <ScrollView style={styles.book_list}>
        {loading ? (
          <Text style={styles.text_loading}>Cargando...</Text>
        ) : (
          books &&
          books.map((book, i) => (
            <Book navigation={navigation} book={book} key={i} />
          ))
        )}
      </ScrollView>
      {/* add button */}
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
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: StyleList.COLOR_DARK,
  },
  book_list: {
    width: "100%",
  },
  text_loading: {
    padding: 32,
    color: StyleList.COLOR_LIGHT,
    fontSize: StyleList.SIZE_SMALL,
  },
  add_button: {
    width: 80,
    height: 80,
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
