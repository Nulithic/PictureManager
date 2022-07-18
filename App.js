import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, extendTheme } from "native-base";

import { DirectoryProvider } from "./libs/directoryContext";
import Navbar from "./components/Navbar";

import DirectoryScreen from "./screens/DirectoryScreen";
import CameraScreen from "./screens/CameraScreen";

const Stack = createStackNavigator();

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

const config = {
  animation: "timing",
  config: {
    duration: 0,
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
                component={DirectoryScreen}
                options={(props) => ({
                  gestureEnabled: false,
                  animationEnabled: false,
                })}
              />
              <Stack.Screen
                name="ScreenTwo"
                component={CameraScreen}
                options={(props) => ({
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
