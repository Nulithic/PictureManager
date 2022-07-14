import { useState, createRef, forwardRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, HStack, Box, Menu, Button, Input, AlertDialog, Divider, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { usePath } from "../libs/directoryContext";

export default function MenuItem({ item }) {
  const path = usePath();
  const ref = createRef();

  const [showMenu, setShowMenu] = useState(false);

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newName, setNewName] = useState("");

  const [shouldOverlapWithTrigger] = useState(false);
  const [position, setPosition] = useState("auto");

  const handleNavigate = (data) => {
    const current = path.getCurrentPath();
    console.log(current + data);
    // navigation.navigate("Folder")
  };

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleRenameDialog = () => {
    setShowMenu(false);
    setShowRenameDialog((prev) => !prev);
  };

  const handleDeleteDialog = () => {
    setShowMenu(false);
    setShowDeleteDialog((prev) => !prev);
  };

  const handleTextInput = (text) => {
    setNewName(text);
  };

  const handleRename = (item) => {};

  const handleDelete = (item) => {};

  const Item = ({ item }) => (
    <Card style={styles.card}>
      <List.Item
        title={item.data}
        onPress={() => handleNavigate(item.data)}
        onLongPress={handleMenu}
        left={(props) => <List.Icon {...props} icon="folder" />}
      />
    </Card>
  );

  return (
    <>
      <Menu
        w="160"
        placement={position == "auto" ? undefined : position}
        trigger={(triggerProps) => {
          return (
            <TouchableOpacity onPress={() => handleNavigate(item.data)} onLongPress={console.log(triggerProps)}>
              <Box shadow="2" borderColor="coolGray.600" backgroundColor="gray.700" borderWidth="1" rounded="lg" mt="4" mx="2">
                <HStack space="4" alignItems="center" p="4">
                  <Icon as={MaterialIcons} name="folder" size="xl" />
                  <Text fontSize="lg">{item.data}</Text>
                </HStack>
              </Box>
            </TouchableOpacity>
          );
        }}
      >
        <Menu.Item>Rename</Menu.Item>
        <Menu.Item>Delete</Menu.Item>
      </Menu>
      {/* <Menu style={styles.menu} visible={showMenu} onDismiss={handleMenu} anchor={<Item item={item} />}>
        <Menu.Item onPress={handleRenameDialog} title="Rename" />
        <Divider />
        <Menu.Item onPress={handleDeleteDialog} title="Delete" />
      </Menu>
      <Portal>
        <AlertDialog visible={showRenameDialog} onDismiss={handleRenameDialog}>
          <AlertDialog.Title>New Name</AlertDialog.Title>
          <AlertDialog.Content>
            <Input mode="outlined" label="New Name" value={newName} onChangeText={handleTextInput} />
          </AlertDialog.Content>
          <AlertDialog.Actions>
            <Button onPress={handleRenameDialog}>Cancel</Button>
            <Button onPress={handleRename}>Rename</Button>
          </AlertDialog.Actions>
        </AlertDialog>

        <AlertDialog visible={showDeleteDialog} onDismiss={handleDeleteDialog}>
          <AlertDialog.Title>Delete {item.data}?</AlertDialog.Title>
          <AlertDialog.Actions>
            <Button onPress={handleDeleteDialog}>Cancel</Button>
            <Button color="red" onPress={handleDelete}>
              Delete
            </Button>
          </AlertDialog.Actions>
        </AlertDialog>
      </Portal> */}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  menu: {
    // transform: [{ translateX: 2 }, { translateY: 68 }],
  },
});
