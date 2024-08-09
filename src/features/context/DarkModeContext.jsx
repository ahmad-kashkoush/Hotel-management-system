import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { createContext, useContext, useEffect } from "react";

const DarkModeContext = createContext();
const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) throw Error("Used dark mode context outside of its provider");

  return context;
};
function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(true, "isDarkMode");
  const toggleMode = () => setIsDark((cur) => !cur);

  useEffect(() => {
    const [classToRemove, classToAdd] = isDark
      ? ["light-mode", "dark-mode"]
      : ["dark-mode", "light-mode"];
    document.documentElement.classList.add(classToAdd);
    document.documentElement.classList.remove(classToRemove);
  }, [isDark]);
  return (
    <DarkModeContext.Provider
      value={{
        isDark,
        toggleMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}
export { DarkModeProvider, useDarkMode };
