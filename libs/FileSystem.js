import * as FileSystem from "expo-file-system";

const mainDir = FileSystem.documentDirectory;

const getRootPath = async () => {
  const root = FileSystem.documentDirectory;
  return root;
};

const getInfo = async (item) => {
  const info = await FileSystem.getInfoAsync(item);
  return info;
};

const getCurrentDir = async (path) => {
  const dir = await FileSystem.readDirectoryAsync(path);
  return dir;
};

const createDir = async (path) => {
  const dirInfo = await FileSystem.getInfoAsync(path);
  if (!dirInfo.exists) {
    console.log("Directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(path, { intermediates: true });
  }
};

const createFile = async (path, content) => {
  await FileSystem.writeAsStringAsync(path, content);
};

const deleteItem = async (path) => {
  await FileSystem.deleteAsync(path);
};

export { getRootPath, getInfo, getCurrentDir, createDir, createFile, deleteItem };
