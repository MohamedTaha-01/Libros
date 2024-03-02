import { useEffect, useState } from "react";
import Form from "../components/Form";
import { Pressable, StyleSheet, Text } from "react-native";
import StyleList from "../styles/StyleList";

export default function EditBook({ navigation, route }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  // PUT request Function that the form will run when submitted
  const editBookFunction = async (author, title) => {
    try {
      fetch(`http://192.168.1.40:3000/books/${route.params.bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, title }),
      }).then((response) => {
        if (response.ok) {
          navigation.goBack();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBookFunction = async () => {
    try {
      fetch(`http://192.168.1.40:3000/books/${route.params.bookId}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          navigation.goBack();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Get book with bookId
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://192.168.1.40:3000/books/${route.params.bookId}`
        );
        const result = await response.json();
        setBook(result);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchBook();
  }, []);

  return (
    <>
      {/* When book is fetched show the form */}
      {loading ? (
        <Text style={styles.text_loading}>Cargando...</Text>
      ) : book ? (
        <Form
          navigation={navigation}
          submitButtonText={"Modificar"}
          submitButtonFunction={editBookFunction}
          bookTitle={book.title}
          bookAuthor={book.author}
          deleteFunction={deleteBookFunction}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  text_loading: {
    padding: 32,
    textAlign: "center",
    color: StyleList.COLOR_LIGHT,
    fontSize: StyleList.SIZE_SMALL,
  },
});
