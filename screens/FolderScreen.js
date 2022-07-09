import React from "react";
import { View, VirtualizedList, StyleSheet, Text, StatusBar, Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

export default function FolderScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Button title="Main Screen" onPress={() => navigation.navigate("Main")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
