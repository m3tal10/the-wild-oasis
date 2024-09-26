import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //01. Load the Authenticated User
  const { isLoading, user, isAuthenticated } = useUser();

  //03. No authenticated user redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) return navigate("./login");
  }, [isAuthenticated, isLoading, navigate]);

  //02. While Loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //04. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
