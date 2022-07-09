import { useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { Platform } from "react-native";

import { getMainDir, createDir } from "../libs/FileSystem";

export default function Navbar({ options, navigation, back }) {
  const handleGetDir = () => {};

  const handleCreateDir = () => {};

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title} subtitle={options.subtitle} />
      <Appbar.Action icon={"folder-plus-outline"} onPress={getMainDir} />
      <Appbar.Action icon={"folder-sync-outline"} onPress={() => {}} />
    </Appbar.Header>
  );
}
