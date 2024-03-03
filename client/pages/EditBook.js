import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import StyleList from "../styles/StyleList";
import { SafeAreaView } from "react-native-safe-area-context";
import FormButton from "../components/FormButton";
import useGetBookWithID from "../hooks/useGetBookWithID";

/* Includes the form component and passes editBookFunction to run it when the form is submitted. */
export default function EditBook({ navigation, route }) {
  // is user modifying the book
  const [modifying, setModifying] = useState(false);
  // book title and author
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // is there a validation error
  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

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
    if (!title.trim()) setTitleError(true);
    else setTitleError(false);
  };
  // Validate author
  const validateAuthor = (author) => {
    if (!author.trim()) setAuthorError(true);
    else setAuthorError(false);
  };

  // PUT /books/:id request function
  const editBookFunction = async () => {
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

  // DELETE /books/:id request function
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

  // GET /books/:id request function
  const { book, loading } = useGetBookWithID(route.params.bookId);
  // Set title and author inputs
  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
  }, [book, modifying]);

  return (
    <>
      {/* When book is fetched show the form */}
      {loading ? (
        <Text style={styles.text_loading}>Cargando...</Text>
      ) : book ? (
        modifying ? (
          // when modifying show the form
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
              style={styles.input}
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
              style={styles.input}
              onChangeText={(author) => handleAuthorChange(author)}
              onBlur={() => {
                validateAuthor(author);
              }}
            />
            <FormButton
              text={"Confirmar"}
              pressFunction={() => {
                if (!titleError && !authorError) editBookFunction();
              }}
              color={StyleList.COLOR_PRIMARY}
            />
            <FormButton
              text={"Cancelar"}
              pressFunction={() => {
                setModifying(false);
              }}
              color={StyleList.COLOR_PRIMARY}
            />
          </SafeAreaView>
        ) : (
          // when not modifying show the book info
          <SafeAreaView style={styles.container}>
            <Text style={styles.details_header}>Título</Text>
            <Text style={styles.details_data}>{book.title}</Text>
            <Text style={styles.details_header}>Autor</Text>
            <Text style={styles.details_data}>{book.author}</Text>
            <FormButton
              text={"Modificar"}
              pressFunction={() => {
                setModifying(true);
              }}
              color={StyleList.COLOR_PRIMARY}
            />
            <FormButton
              text={"Eliminar"}
              pressFunction={() => {
                deleteBookFunction();
              }}
              color={StyleList.COLOR_RED}
            />
          </SafeAreaView>
        )
      ) : null}
    </>
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
  text_loading: {
    padding: 32,
    textAlign: "center",
    color: StyleList.COLOR_LIGHT,
    fontSize: StyleList.SIZE_SMALL,
  },
  details_header: {
    width: "100%",
    fontSize: StyleList.SIZE_MEDIUM,
    color: StyleList.COLOR_LIGHT,
    marginTop: StyleList.SIZE_MEDIUM,
  },
  details_data: {
    width: "100%",
    fontSize: StyleList.SIZE_SMALL,
    color: StyleList.COLOR_LIGHT,
    marginTop: StyleList.SIZE_SMALL,
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
