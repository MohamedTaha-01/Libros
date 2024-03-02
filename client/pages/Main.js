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

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://192.168.1.40:3000/books");
      const result = await response.json();
      setBooks(result || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.book_list}>
        {books &&
          books.map((book, i) => (
            <Book navigation={navigation} book={book} key={i} />
          ))}
      </ScrollView>
      <Pressable
        style={styles.add_button}
        onPress={() => navigation.navigate("CreateBook")}
      >
        <Text style={styles.add_button__text}>Añadir libro</Text>
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
  add_button: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: StyleList.COLOR_PRIMARY,
  },
  add_button__text: {
    fontSize: StyleList.SIZE_MEDIUM,
    fontWeight: "bold",
    color: StyleList.COLOR_DARK,
  },
});
