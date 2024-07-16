import GlobalStyles from "@/styles/GlobalStyles";
import Header from "@/ui/Header";
import Sidebar from "@/ui/Sidebar";
import { Outlet } from "react-router";
import styled from "styled-components";

const StyledApp = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;
//  main is common between all components, so have it here is less code written
const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-100);
`;
function AppLayout() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Sidebar />
        <Header />
        <Main>
          <Outlet />
        </Main>
      </StyledApp>
    </>
  );
}
export default AppLayout;
