import { useState, useEffect } from "react";
import { View, VirtualizedList, StyleSheet, Text, StatusBar, Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import { usePath } from "../libs/DirectoryContext";
import { getMainDir } from "../libs/FileSystem";

const DATA = ["asdf1", "asdf2", "asdf3", "asdf4", "asdf5", "asdf6"];

const getItem = (data, index) => ({
  key: index,
  id: Math.random().toString().substring(2, 8),
  title: `Item ${index + 1}`,
  data: data[index],
});

const getItemCount = (data) => 6;

const Item = ({ key, id, title, data }) => (
  <View key={key} style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{id}</Text>
    <Text style={styles.title}>{data}</Text>
  </View>
);

export default function MainScreen({ navigation }) {
  const path = usePath();
  console.log(path.root);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Button title="Folder Screen" onPress={() => navigation.navigate("Folder")} />
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item id={item.id} title={item.title} data={item.data} />}
        keyExtractor={(item) => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: "#f9c2ff",
    height: 150,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
