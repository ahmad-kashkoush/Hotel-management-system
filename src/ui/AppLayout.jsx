import { Header, Sidebar } from "@/ui";
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
  overflow: scroll;
`;
const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
function AppLayout() {
  return (
    <>
      <StyledApp>
        <Sidebar />
        <Header />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledApp>
    </>
  );
}
export default AppLayout;
