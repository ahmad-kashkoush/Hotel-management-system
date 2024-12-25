import useGetUser from "@/features/authentication/useGetUser";
import { Spinner } from "@/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useGetUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return <>{children}</>;
}
export default ProtectedRoute;
