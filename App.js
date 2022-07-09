import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import { DirectoryProvider } from "./libs/DirectoryContext";
import Navbar from "./components/Navbar";

import MainScreen from "./screens/MainScreen";
import FolderScreen from "./screens/FolderScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DirectoryProvider>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer>
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
        </PaperProvider>
      </SafeAreaProvider>
    </DirectoryProvider>
  );
}
