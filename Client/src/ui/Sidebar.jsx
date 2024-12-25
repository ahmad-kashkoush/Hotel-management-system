import Uploader from "@/data/Uploader";
import { Logo, MainNav } from "@/ui";
import styled from "styled-components";

const StyleSidebar = styled.aside`
  grid-row: 1/-1;
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
`;

function Sidebar() {
  return (
    <StyleSidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyleSidebar>
  );
}
export default Sidebar;
