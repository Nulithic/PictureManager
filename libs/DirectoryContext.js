import { createContext, useContext, useState, useEffect } from "react";
import { getRootPath, getInfo, getCurrentDir } from "./fileSystem";

const DirectoryContext = createContext();

export const usePath = () => {
  return useContext(DirectoryContext);
};

export const DirectoryProvider = ({ children }) => {
  const [root, setRoot] = useState();
  const [pathList, setPathList] = useState([]);
  const [currentDirList, setCurrentDirList] = useState([]);
  const [selectionMode, setSelectionMode] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const getCurrentPath = () => {
    return root + pathList.join("/");
  };

  const handleGetRootPath = async () => {
    const res = await getRootPath();
    setRoot(res);
  };

  const getCurrentDirList = async () => {
    const curr = getCurrentPath();
    const list = await getCurrentDir(curr);
    let newList = [];

    for (let item of list) {
      const info = await getInfo(curr + item);
      if (info.isDirectory) {
        newList.push({ name: item, type: "directory" });
      } else {
        newList.push({ name: item, type: "file" });
      }
    }
    setCurrentDirList(newList);
  };

  useEffect(() => {
    if (currentDirList.filter((i) => i.selected).length > 0) {
      setSelectionMode(true);
    } else {
      setSelectionMode(false);
    }
  });

  useEffect(() => {
    handleGetRootPath();
  }, []);

  return (
    <DirectoryContext.Provider
      value={{ root, pathList, currentDirList, selectionMode, showCamera, setPathList, setCurrentDirList, getCurrentPath, getCurrentDirList, setShowCamera }}
    >
      {children}
    </DirectoryContext.Provider>
  );
};
