import { useDarkMode } from "@/features/context/DarkModeContext";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDark } = useDarkMode();
  const src = isDark ? "logo-dark.png" : "logo-light.png";
  return (
    <StyledLogo>
      <Img className="logo-image" src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
