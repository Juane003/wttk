import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

import useToggle from "./useToggle";

const useDrawer = () => {
  const [isOpen, toggleDrawer] = useToggle(false);
  const [snapPoints, setSnapPoints] = useState([50]);

  useEffect(() => {
    const handleKeyboard = () => {
      if (Platform.OS === "android") {
        setSnapPoints([Keyboard.isVisible() ? 80 : 50]);
      }
    };

    handleKeyboard();

    Keyboard.addListener("keyboardDidShow", handleKeyboard);
    Keyboard.addListener("keyboardDidHide", handleKeyboard);
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  return { isOpen, toggleDrawer, snapPoints };
};

export default useDrawer;
