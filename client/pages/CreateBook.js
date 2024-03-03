import { useState } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import FormButton from "../components/FormButton";
import StyleList from "../styles/StyleList";
import { mainStyles } from "../styles/MainStyles";

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

  // call validation functions and call POST request function
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
    <SafeAreaView style={mainStyles.container}>
      {/*
       * ---------- TITLE ----------
       *  */}
      <Text style={mainStyles.label}>Título del libro</Text>
      {/* title validation error message */}
      {titleError && titleError ? (
        <Text style={mainStyles.label_error}>Título no válido</Text>
      ) : null}
      {/* title input */}
      <TextInput
        value={title}
        style={[
          mainStyles.input,
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
      <Text style={mainStyles.label}>Autor del libro</Text>
      {/* author validation error message */}
      {authorError && authorError ? (
        <Text style={mainStyles.label_error}>Autor no válido</Text>
      ) : null}
      {/* author input */}
      <TextInput
        value={author}
        style={[
          mainStyles.input,
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
