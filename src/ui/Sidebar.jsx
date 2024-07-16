import styled from "styled-components";
import MainNav from "@/ui/MainNav";

const Logo = styled.h1`
  letter-spacing: -5px;
  font-style: italic;
  text-align: center;
  color: var(--color-silver-700);
`;
const StyleSidebar = styled.aside`
  grid-row: 1/-1;
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
`;

function Sidebar() {
  return (
    <StyleSidebar>
      <Logo>Nostalgic</Logo>
      <MainNav />
    </StyleSidebar>
  );
}
export default Sidebar;
