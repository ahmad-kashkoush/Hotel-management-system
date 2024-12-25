import { useDarkMode } from "@/features/context/DarkModeContext";
import { ButtonIcon } from "@/ui";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function ToggleDarkMode() {
  const { isDark, toggleMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleMode}>{isDark ? <HiOutlineMoon /> : <HiOutlineSun />}</ButtonIcon>
  );
}
export default ToggleDarkMode;
