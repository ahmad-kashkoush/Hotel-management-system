import useLogout from "@/features/authentication/useLogout";
import { Button, ButtonIcon, SpinnerMini } from "@/ui";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
function Header() {
  const { logout, isLoading } = useLogout();
  return (
    <StyledHeader>
      Header
      <ButtonIcon disabled={isLoading} onClick={() => logout()}>
        {isLoading ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />}
      </ButtonIcon>
    </StyledHeader>
  );
}
export default Header;
