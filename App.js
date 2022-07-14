import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, extendTheme } from "native-base";

import { DirectoryProvider } from "./libs/directoryContext";
import Navbar from "./components/Navbar";

import MainScreen from "./screens/MainScreen";
import FolderScreen from "./screens/FolderScreen";

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

export default function App() {
  return (
    <DirectoryProvider>
      <SafeAreaProvider style={{ backgroundColor: "#27272a" }}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{ header: (props) => <Navbar {...props} /> }}>
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={(props) => ({
                  title: props.route.name,
                  subtitle: "cool",
                })}
              />
              <Stack.Screen name="Folder" component={FolderScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </DirectoryProvider>
  );
}
