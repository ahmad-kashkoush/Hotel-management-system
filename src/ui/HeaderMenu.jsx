import { ButtonIcon } from "@/ui";
import Logout from "@/ui/Logout";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router";
import styled from "styled-components";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonAccount />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
function ButtonAccount() {
  const navigate = useNavigate();
  return (
    <ButtonIcon onClick={() => navigate("/account")}>
      <HiOutlineUser />
    </ButtonIcon>
  );
}

export default HeaderMenu;
