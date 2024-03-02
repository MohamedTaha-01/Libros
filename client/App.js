import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./pages/Main";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import StyleList from "./styles/StyleList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.app_container}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: "Libros",
              ...headerOptions,
            }}
          />
          <Stack.Screen
            name="CreateBook"
            component={CreateBook}
            options={{
              title: "Añadir libro",
              ...headerOptions,
            }}
          />
          <Stack.Screen
            name="EditBook"
            component={EditBook}
            initialParams={{ name: "Editar libro" }}
            options={({ route }) => ({
              ...headerOptions,
              title: route.params.title,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// Header style
const headerOptions = {
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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: StyleList.COLOR_DARK,
  },
};

const styles = StyleSheet.create({
  app_container: { flex: 1, backgroundColor: StyleList.COLOR_DARK },
});
