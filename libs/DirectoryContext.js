import { createContext, useContext, useState, useEffect } from "react";
import { getRootPath } from "./FileSystem";

const DirectoryContext = createContext();

export const usePath = () => {
  return useContext(DirectoryContext);
};

export const DirectoryProvider = ({ children }) => {
  const [root, setRoot] = useState();
  const [path, setPath] = useState([]);

  const getCurrentPath = () => {
    return root + path.join("/");
  };

  const handleGetRootPath = async () => {
    setRoot(await getRootPath());
  };

  useEffect(() => {
    handleGetRootPath();
  }, []);

  return <DirectoryContext.Provider value={{ root, path, setPath, getCurrentPath }}>{children}</DirectoryContext.Provider>;
};
