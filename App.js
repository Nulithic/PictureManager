import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, extendTheme } from "native-base";

import { DirectoryProvider } from "./libs/directoryContext";
import Navbar from "./components/Navbar";

import Directories from "./screens/Directories";
import ScreenTwo from "./screens/ScreenTwo";

const Stack = createStackNavigator();

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

const config = {
  animation: "timing",
  config: {
    duration: 500,
  },
};

export default function App() {
  return (
    <DirectoryProvider>
      <SafeAreaProvider style={{ backgroundColor: "#27272a" }}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{ header: (props) => <Navbar {...props} /> }}>
              <Stack.Screen
                name="Directories"
                component={Directories}
                options={(props) => ({
                  title: props.route.name,
                  subtitle: "cool",
                  gestureEnabled: false,
                  transitionSpec: {
                    open: config,
                    close: config,
                  },
                })}
              />
              <Stack.Screen
                name="ScreenTwo"
                component={ScreenTwo}
                options={(props) => ({
                  title: props.route.name,
                  subtitle: "cool",
                  gestureEnabled: false,
                  transitionSpec: {
                    open: config,
                    close: config,
                  },
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </DirectoryProvider>
  );
}
