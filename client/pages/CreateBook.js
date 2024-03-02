import Form from "../components/Form";

export default function CreateBook({ navigation }) {
  return (
    <>
      <Form navigation={navigation} submitButtonText={"Añadir"} />
    </>
  );
}
