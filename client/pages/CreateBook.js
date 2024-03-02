import Form from "../components/Form";

/* Includes the form component and passes createBookFunction to run it when the form is submitted */
export default function CreateBook({ navigation }) {
  // POST /books request function
  const createBookFunction = async (author, title) => {
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

  return (
    <Form
      navigation={navigation}
      submitButtonText={"Añadir"}
      submitButtonFunction={createBookFunction}
    />
  );
}
