import * as FileSystem from "expo-file-system";

const mainDir = FileSystem.documentDirectory;

const getRootPath = async () => {
  const root = FileSystem.documentDirectory;
  //   console.log(root);
  return root;
};

const getCurrentDir = async () => {
  const root = await getRootPath();
  const dir = await FileSystem.readDirectoryAsync(root);
  //   console.log(dir);
  return dir;
};

const createDir = async (path) => {
  const dir = await FileSystem.getInfoAsync(path);
  if (!dirInfo.exists) {
    console.log("Directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(path, { intermediates: true });
  }
};

export { getRootPath, getCurrentDir, createDir };
