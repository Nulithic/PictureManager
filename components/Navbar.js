import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Modal, HStack, Button, IconButton, Icon, Text, Input, Center, Box, StatusBar } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { usePath } from "../libs/directoryContext";
import { getMainDir, getCurrentDir, createDir, createFile, renameItem, deleteItem } from "../libs/fileSystem";

export default function Navbar({ options, navigation, back }) {
  const path = usePath();
  const selections = path.currentDirList.filter((i) => i.selected);

  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [dialogState, setDialogState] = useState("");

  const clearSelection = () => {
    path.setCurrentDirList(
      path.currentDirList.map((i) => {
        i.selected = false;
        return i;
      })
    );
  };

  const handleBackNav = () => {
    let list = path.pathList;
    list.pop();
    path.setPathList(list);
    navigation.pop();
  };

  const handleDialog = (state) => {
    if (state !== "") setDialogState(state);
    setInputText("");
    setVisible((prev) => !prev);
  };

  const handleTextInput = (text) => {
    setInputText(text);
  };

  const handleCamera = async () => {
    path.setShowCamera((prev) => !prev);

    // const dir = path.getCurrentPath();
    // await createFile(dir + folderName, "Test 123");
    // await path.getCurrentDirList();

    // handleDialog();
    // setFolderName("");
  };

  const handleDialogAction = async () => {
    const dir = path.getCurrentPath();
    switch (dialogState) {
      case "newFolder":
        await createDir(dir + inputText);
        await path.getCurrentDirList();
        handleDialog();
        setInputText("");
        break;
      case "rename":
        if (selections.length === 1) {
          if (selections[0].type === "directory") {
            await renameItem(dir + selections[0].name, dir + inputText);
          } else {
            const ext = selections[0].name.split(".").pop();
            await renameItem(dir + selections[0].name, `${dir + inputText}.${ext}`);
          }
          await path.getCurrentDirList();
        }
        handleDialog();
        setInputText("");
        break;

      case "delete":
        const deleteList = path.currentDirList.filter((i) => i.selected);
        for (let item of deleteList) {
          await deleteItem(dir + item.name);
        }
        await path.getCurrentDirList();
        handleDialog();
        break;
      default:
        return "";
    }
  };

  const handleSyncServer = async () => {
    console.log(path.getCurrentPath());
    console.log(path.currentDirList);
    console.log(path.pathList);
  };

  const dialogHeader = () => {
    switch (dialogState) {
      case "newFolder":
        return "New Folder";
      case "rename":
        return "Rename";
      case "delete":
        return "Delete";
      default:
        return "";
    }
  };

  const dialogInput = () => {
    switch (dialogState) {
      case "newFolder":
        return "Folder Name";
      case "rename":
        return "New Name";
      default:
        return "";
    }
  };

  return (
    <>
      <StatusBar bg="#27272a" barStyle="light-content" />
      <Box bg="#27272a" safeAreaTop />

      {path.showCamera ? null : (
        <>
          <HStack bg="#27272a" px="1" py="2" justifyContent="space-between" alignItems="center" w="100%">
            {path.selectionMode ? (
              <>
                <HStack alignItems="center">
                  <IconButton icon={<Icon as={MaterialIcons} name="arrow-back-ios" color="white" />} onPress={clearSelection} />
                  <Text color="white" fontSize="20" fontWeight="bold" pl="3">
                    {path.currentDirList.filter((i) => i.selected).length} Selected
                  </Text>
                </HStack>
                <HStack>
                  {selections.length === 1 ? (
                    <IconButton
                      icon={<Icon as={MaterialIcons} name="drive-file-rename-outline" color="white" size="lg" />}
                      onPress={() => handleDialog("rename")}
                    />
                  ) : null}
                  <IconButton
                    icon={<Icon as={MaterialCommunityIcons} name="delete-outline" color="white" size="lg" />}
                    onPress={() => handleDialog("delete")}
                  />
                </HStack>
              </>
            ) : (
              <>
                <HStack alignItems="center">
                  {back ? <IconButton icon={<Icon as={MaterialIcons} name="arrow-back-ios" color="white" />} onPress={handleBackNav} /> : null}
                  <Text color="white" fontSize="20" fontWeight="bold" pl="3">
                    {options.title}
                  </Text>
                </HStack>
                <HStack space="2">
                  <IconButton icon={<Icon as={MaterialCommunityIcons} name="camera-outline" color="white" size="xl" />} onPress={handleCamera} />
                  <IconButton
                    icon={<Icon as={MaterialCommunityIcons} name="folder-plus-outline" color="white" size="xl" />}
                    onPress={() => handleDialog("newFolder")}
                  />
                  <IconButton icon={<Icon as={MaterialCommunityIcons} name="folder-sync-outline" color="white" size="xl" />} onPress={handleSyncServer} />
                </HStack>
              </>
            )}
          </HStack>

          <Center>
            <Modal isOpen={visible} avoidKeyboard onClose={handleDialog}>
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>{dialogHeader()}</Modal.Header>
                <Modal.Body _scrollview={{ scrollEnabled: false }}>
                  {dialogState === "delete" ? (
                    <Text>Are you sure you want to delete?</Text>
                  ) : (
                    <Input variant="outline" placeholder={dialogInput()} value={inputText} onChangeText={handleTextInput} />
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button variant="unstyled" colorScheme="coolGray" onPress={handleDialog}>
                      Cancel
                    </Button>
                    <Button colorScheme="green" onPress={handleDialogAction}>
                      Confirm
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
        </>
      )}
    </>
  );
}
