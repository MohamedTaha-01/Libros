import { useEffect } from "react";
import Form from "../components/Form";

export default function EditBook({ navigation, route }) {
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.40:3000/books/${bookId}`
        );
        const result = await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, []);

  return (
    <>
      <Form navigation={navigation} submitButtonText={"Modificar"} />
    </>
  );
}
