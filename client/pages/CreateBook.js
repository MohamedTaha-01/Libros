import { useState } from "react";
import FormButton from "../components/FormButton";
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import StyleList from "../styles/StyleList";

/* Includes the form component and passes createBookFunction to run it when the form is submitted */
export default function CreateBook({ navigation }) {
  // book title and author
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // is there a validation error
  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  // POST /books request function
  const createBookFunction = async () => {
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
  };

  const handleCreateBook = () => {
    validateTitle(title);
    validateAuthor(author);
    if (!titleError && !authorError) {
      createBookFunction();
    }
  };

  // set title and validate
  const handleTitleChange = (title) => {
    setTitle(title);
    validateTitle(title);
  };
  // set author and validate
  const handleAuthorChange = (author) => {
    setAuthor(author);
    validateAuthor(author);
  };

  // Validate title
  const validateTitle = (title) => {
    if (!title || title === "" || !title.trim()) setTitleError(true);
    else setTitleError(false);
  };
  // Validate author
  const validateAuthor = (author) => {
    if (!author || author === "" || !author.trim()) setAuthorError(true);
    else setAuthorError(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*
       * ---------- TITLE ----------
       *  */}
      <Text style={styles.label}>Título del libro</Text>
      {/* title validation error message */}
      {titleError && titleError ? (
        <Text style={styles.label_error}>Título no válido</Text>
      ) : null}
      {/* title input */}
      <TextInput
        value={title}
        style={[
          styles.input,
          titleError ? { borderBottomColor: StyleList.COLOR_RED } : "",
        ]}
        onChangeText={(title) => handleTitleChange(title)}
        onBlur={() => {
          validateTitle(title);
        }}
      />
      {/*
       * ---------- AUTHOR ----------
       *  */}
      <Text style={styles.label}>Autor del libro</Text>
      {/* author validation error message */}
      {authorError && authorError ? (
        <Text style={styles.label_error}>Autor no válido</Text>
      ) : null}
      {/* author input */}
      <TextInput
        value={author}
        style={[
          styles.input,
          authorError ? { borderBottomColor: StyleList.COLOR_RED } : "",
        ]}
        onChangeText={(author) => handleAuthorChange(author)}
        onBlur={() => {
          validateAuthor(author);
        }}
      />
      <FormButton
        text={"Añadir"}
        pressFunction={() => {
          handleCreateBook();
        }}
        color={StyleList.COLOR_PRIMARY}
      />
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
});
