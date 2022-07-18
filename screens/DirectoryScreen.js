import { useState, useEffect, useCallback, createRef, forwardRef } from "react";
import { FlatList, VirtualizedList, StyleSheet, StatusBar, TouchableOpacity, InteractionManager } from "react-native";
import { Icon, HStack, Box, Menu, Button, Input, AlertDialog, Divider, Text } from "native-base";
import SafeAreaView from "react-native-safe-area-view";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";

import CameraView from "../components/CameraView";

import { usePath } from "../libs/directoryContext";

const { compare } = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

const getItem = (data, index) => ({
  key: index,
  data: data[index],
});

export default function Directories({ navigation }) {
  const path = usePath();
  const dirList = path.currentDirList.sort((a, b) => compare(a.name, b.name));
  const isFocused = useIsFocused();

  const toggleSelect = (item) => {
    path.setCurrentDirList(
      path.currentDirList.map((i) => {
        if (item === i) {
          i.selected = !i.selected;
        }
        return i;
      })
    );
  };

  const onPress = (item) => {
    if (path.selectionMode) {
      toggleSelect(item);
    } else {
      if (item.type === "directory") {
        path.setCurrentDirList([]);
        path.setPathList((arr) => [...arr, item.name]);
        navigation.push("Directories");
      }
    }
  };

  const onLongPress = (item) => {
    if (path.selectionMode === false) {
      toggleSelect(item);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     await path.getCurrentDirList();
  //   })();
  // }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(async () => {
        await path.getCurrentDirList();
      });

      return () => task.cancel();
    }, [])
  );

  const RenderItem = ({ data }) => (
    <TouchableOpacity onPress={() => onPress(data)} onLongPress={() => onLongPress(data)}>
      <Box shadow="2" borderColor="coolGray.600" backgroundColor="gray.700" borderWidth="1" rounded="lg" mt="4" mx="2">
        <HStack space="4" alignItems="center" p="4">
          {data.selected ? (
            <Icon as={MaterialIcons} name="check-circle" size="xl" color="success.400" />
          ) : data.type === "directory" ? (
            <Icon as={MaterialIcons} name="folder" size="xl" />
          ) : (
            <Icon as={MaterialIcons} name="image" size="xl" />
          )}
          <Text fontSize="lg">{data.name}</Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        style={{ height: "100%" }}
        data={dirList}
        initialNumToRender={10}
        renderItem={({ item }) => <RenderItem data={item.data} />}
        keyExtractor={(item) => item.key}
        getItemCount={(data) => data.length}
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
});
