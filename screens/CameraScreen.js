import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, Linking } from "react-native";
import { HStack, IconButton, Icon, Slider, Box, Center } from "native-base";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { PinchGestureHandler } from "react-native-gesture-handler";

import { usePath } from "../libs/directoryContext";

export default function CameraScreen({ navigation }) {
  const path = usePath();

  const devices = useCameraDevices();
  const device = devices.back;

  const [cameraPermissionStatus, setCameraPermissionStatus] = useState();
  const [type, setType] = useState(CameraType.back);
  const [zoom, setZoom] = useState(0);

  const getCameraDevices = async () => {
    const devices = await Camera.getAvailableCameraDevices();
    console.log(devices);
  };

  useEffect(() => {
    (async () => {
      console.log("Requesting camera permission...");
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);

      if (permission === "denied") await Linking.openSettings();
      setCameraPermissionStatus(permission);
    })();
  }, []);

  if (device === null) {
    return <View />;
  }

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    // <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
    //   <View style={styles.container}>
    //     <Camera style={styles.camera} type={type} zoom={zoom}>
    //       <HStack px="1" py="2" mt="5" justifyContent="flex-start" alignItems="center">
    //         <IconButton
    //           icon={<Icon as={MaterialIcons} name="arrow-back-ios" color="white" />}
    //           onPress={() => {
    //             path.setCameraMode((prev) => !prev);
    //             navigation.pop();
    //           }}
    //         />
    //       </HStack>
    //     </Camera>
    //     <Box alignItems="center" w="100%" h="20%" px="1" py="2">
    //       <Slider maxW="300" defaultValue={0} minValue={0} maxValue={0.1} value={zoom} step={0.001} onChange={(value) => setZoom(value)}>
    //         <Slider.Track>
    //           <Slider.FilledTrack />
    //         </Slider.Track>
    //         <Slider.Thumb />
    //       </Slider>
    //       <HStack justifyContent="space-between" alignItems="center" w="100%" mt="5">
    //         <IconButton icon={<Icon as={MaterialCommunityIcons} name="camera-flip-outline" color="white" size="xl" />} onPress={handleFlipCamera} />
    //         <IconButton icon={<Icon as={MaterialCommunityIcons} name="circle-outline" color="white" size="6xl" />} onPress={handleFlipCamera} />
    //         <Box p="10px">
    //           <Icon as={MaterialCommunityIcons} name="camera-flip-outline" color="#27272a" size="xl" />
    //         </Box>
    //       </HStack>
    //     </Box>
    //   </View>
    // </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
