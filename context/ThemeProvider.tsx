import { useColorMode } from "@/hooks/useColorMode";
import { createContext, useContext } from "react";

type ThemeContextState = {
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
};

const INITIAL_STATE: ThemeContextState = {
  colorMode: "light",
  toggleColorMode: () => {},
};

const ThemeContext = createContext(INITIAL_STATE);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
