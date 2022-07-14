import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Modal, HStack, Button, IconButton, Icon, Text, Input, Center, Box, StatusBar } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { usePath } from "../libs/directoryContext";
import { getMainDir, createDir, createFile, getCurrentDir } from "../libs/fileSystem";

export default function Navbar({ options, navigation, back }) {
  const path = usePath();
  const selections = path.currentDirList.filter((i) => i.selected);

  const [visible, setVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

  const clearSelection = () => {
    path.setCurrentDirList(
      path.currentDirList.map((i) => {
        i.selected = false;
        return i;
      })
    );
  };

  const handleDelete = () => {
    console.log(path.currentDirList.filter((i) => i.selected));
  };

  const handleDialog = () => {
    setFolderName("");
    setVisible((prev) => !prev);
  };

  const handleTextInput = (text) => {
    setFolderName(text);
  };

  const handleCamera = async () => {
    path.setShowCamera((prev) => !prev);

    // const dir = path.getCurrentPath();
    // await createFile(dir + folderName, "Test 123");
    // await path.getCurrentDirList();

    // handleDialog();
    // setFolderName("");
  };

  const handleCreateDir = async () => {
    const dir = path.getCurrentPath();
    await createDir(dir + folderName);
    await path.getCurrentDirList();

    handleDialog();
    setFolderName("");
  };

  const handleSyncServer = async () => {
    console.log(path.currentDirList);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop />
      <HStack px="1" py="2" justifyContent="space-between" alignItems="center" w="100%">
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
                <IconButton icon={<Icon as={MaterialIcons} name="drive-file-rename-outline" color="white" size="lg" />} onPress={handleDialog} />
              ) : null}
              <IconButton icon={<Icon as={MaterialCommunityIcons} name="delete-outline" color="white" size="lg" />} onPress={handleDelete} />
            </HStack>
          </>
        ) : (
          <>
            <HStack alignItems="center">
              {back ? <IconButton icon={<Icon as={MaterialIcons} name="arrow-back-ios" color="white" />} onPress={navigation.goBack} /> : null}
              <Text color="white" fontSize="20" fontWeight="bold" pl="3">
                {options.title}
              </Text>
            </HStack>
            <HStack space="2">
              <IconButton icon={<Icon as={MaterialCommunityIcons} name="camera-outline" color="white" size="xl" />} onPress={handleCamera} />
              <IconButton icon={<Icon as={MaterialCommunityIcons} name="folder-plus-outline" color="white" size="xl" />} onPress={handleDialog} />
              <IconButton icon={<Icon as={MaterialCommunityIcons} name="folder-sync-outline" color="white" size="xl" />} onPress={handleSyncServer} />
            </HStack>
          </>
        )}
      </HStack>

      <Center>
        <Modal isOpen={visible} avoidKeyboard onClose={handleDialog}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>New Folder</Modal.Header>
            <Modal.Body _scrollview={{ scrollEnabled: false }}>
              <Input variant="outline" placeholder="Folder Name" value={folderName} onChangeText={handleTextInput} />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={handleDialog}>
                  Cancel
                </Button>
                <Button colorScheme="green" onPress={handleCreateDir}>
                  Create
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
}
