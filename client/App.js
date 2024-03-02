import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./pages/Main";
import CreateBook from "./pages/CreateBook";
import StyleList from "./styles/StyleList";
import EditBook from "./pages/EditBook";
import { Pressable, Text, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "Libros",
            ...headerStyle,
          }}
        />
        <Stack.Screen
          name="CreateBook"
          component={CreateBook}
          options={{
            title: "Añadir libro",
            ...headerStyle,
          }}
        />
        <Stack.Screen
          name="EditBook"
          component={EditBook}
          initialParams={{ name: "Editar libro" }}
          options={({ route }) => ({
            ...headerStyle,
            title: route.params.title,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Header style
const headerStyle = {
  headerStyle: { backgroundColor: StyleList.COLOR_DARK },
  headerTintColor: StyleList.COLOR_LIGHT,
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: StyleList.SIZE_BIG,
  },
  contentStyle: {
    backgroundColor: StyleList.COLOR_DARK,
  },
};
