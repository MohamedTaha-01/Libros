import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import StyleList from "../styles/StyleList";

/**
 * Form component with 2 fields: Title and Author, and validation functions.
 */
export default function Form({
  submitButtonText,
  submitButtonFunction,
  bookTitle,
  bookAuthor,
  deleteFunction,
}) {
  const [title, setTitle] = useState(bookTitle ?? "");
  const [author, setAuthor] = useState(bookAuthor ?? "");
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

  // If validation correct call submitButtonFunction
  const submitForm = async () => {
    if (validateTitle() && validateAuthor()) {
      submitButtonFunction(author, title);
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
      {/* Form submit button (create or modify) */}
      <Pressable
        style={[styles.form_button, styles.create_button]}
        onPress={submitForm}
      >
        <Text style={styles.form_button__text}>{submitButtonText}</Text>
      </Pressable>
      {/* Delete button */}
      {deleteFunction ? (
        <Pressable
          style={[styles.form_button, styles.delete_button]}
          onPress={() => {
            deleteFunction();
          }}
        >
          <Text style={styles.form_button__text}>Eliminar</Text>
        </Pressable>
      ) : null}
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
  form_button: {
    width: "100%",
    marginTop: StyleList.SIZE_BIG,
    padding: StyleList.SIZE_SMALL,
    borderRadius: 50,
  },
  create_button: {
    backgroundColor: StyleList.COLOR_PRIMARY,
  },
  delete_button: {
    backgroundColor: StyleList.COLOR_RED,
  },
  form_button__text: {
    textAlign: "center",
    color: StyleList.COLOR_DARK,
    fontSize: StyleList.SIZE_MEDIUM,
    fontWeight: "bold",
  },
});
