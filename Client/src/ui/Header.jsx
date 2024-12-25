import UserAvatar from "@/features/authentication/UserAvatar";
import HeaderMenu from "@/ui/HeaderMenu";
import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
