import { useSidebarLinks } from "@/constants/sidebarLinks";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  margin-top: 3.2rem;
`;
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 2rem;
  width: 100%;
  color: var(--color-grey-600);
  font-weight: 500;

  &:hover,
  &.active {
    background-color: var(--color-grey-100);
    color: var(--color-grey-900);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { sidebarLinks } = useSidebarLinks();

  return (
    <StyledNav>
      <NavList>
        {sidebarLinks.map((item) => (
          <li key={item.to}>
            <StyledNavLink to={item.to}>
              {item.icon}
              {item.link}
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </StyledNav>
  );
}

export default MainNav;
