import styled from "styled-components";
import { Lists } from "./components/Lists";
// import { RecentlyUsed } from "./components/RecentlyUsed";
import AppLayout from "./ui/AppLayout";
import React from "react";

const LeftBox = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column; /* Arrange elements vertically */
  align-items: left; /* Center elements horizontally */
  margin: 20px 0;
`;

const App: React.FC = () => {
  return (
    <>
      <AppLayout>
        <LeftBox>
          <Lists />
        </LeftBox>
      </AppLayout>
    </>
  );
};

export default App;
