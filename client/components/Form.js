import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import StyleList from "../styles/StyleList";

export default function Form({
  navigation,
  submitButtonText,
  submitButtonFunction,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [showTitleError, setShowTitleError] = useState(false);
  const [showAuthorError, setShowAuthorError] = useState(false);

  const changeTitle = (title) => {
    setTitle(title);
  };
  const changeAuthor = (author) => {
    setAuthor(author);
  };

  // Validate inputs
  const validateTitle = () => {
    if (!title.trim()) {
      setShowTitleError(true);
      return false;
    } else {
      setShowTitleError(false);
      return true;
    }
  };
  const validateAuthor = () => {
    if (!author.trim()) {
      setShowAuthorError(true);
      return false;
    } else {
      setShowAuthorError(false);
      return true;
    }
  };

  // Validate and post
  const submitForm = async () => {
    if (validateTitle() && validateAuthor()) {
      try {
        const response = await fetch("http://192.168.1.40:3000/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ author, title }),
        });
        const result = await response.json();
        if (response.ok) {
          navigation.goBack();
        } else {
          console.log(result.msg);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* TITLE */}
      <Text style={styles.label}>Título del libro</Text>
      {/* error message */}
      {showTitleError && showTitleError ? (
        <Text style={styles.label_error}>Título no válido</Text>
      ) : null}
      {/* input */}
      <TextInput
        value={title}
        style={styles.input}
        onChangeText={(title) => {
          changeTitle(title);
        }}
      />
      {/* AUTHOR */}
      <Text style={styles.label}>Autor del libro</Text>
      {/* error message */}
      {showAuthorError && showAuthorError ? (
        <Text style={styles.label_error}>Autor no válido</Text>
      ) : null}
      {/* input */}
      <TextInput
        value={author}
        style={styles.input}
        onChangeText={(author) => {
          changeAuthor(author);
        }}
      />
      <Pressable style={styles.create_button} onPress={submitForm}>
        <Text style={styles.create_button__text}>{submitButtonText}</Text>
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
    color: "#e57373",
    marginBottom: StyleList.SIZE_SMALL,
  },
  input: {
    width: "100%",
    fontSize: StyleList.SIZE_MEDIUM,
    color: StyleList.COLOR_LIGHT,
    borderBottomWidth: 1,
    borderBottomColor: StyleList.COLOR_LIGHT,
  },
  create_button: {
    width: "100%",
    marginTop: StyleList.SIZE_BIG,
    padding: StyleList.SIZE_SMALL,
    borderRadius: 50,

    backgroundColor: StyleList.COLOR_PRIMARY,
  },
  create_button__text: {
    textAlign: "center",
    color: StyleList.COLOR_DARK,
    fontSize: StyleList.SIZE_MEDIUM,
    fontWeight: "bold",
  },
});
