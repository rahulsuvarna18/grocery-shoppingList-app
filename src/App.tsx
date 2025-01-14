import styled from "styled-components";
import { Lists } from "./components/Lists";
import { RecentlyUsed } from "./components/RecentlyUsed";
import AppLayout from "./ui/AppLayout";
import React from "react";

const LeftBox = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column; /* Arrange elements vertically */
  align-items: left; /* Center elements horizontally */
  margin: 20px 0;
`;

// interface GroceryItem {
//   id: number;
//   text: string;
//   timestamp?: number;
// }

const App: React.FC = () => {
  return (
    <>
      <AppLayout>
        <LeftBox>
          <Lists />
          <RecentlyUsed />
        </LeftBox>
        <div>
          <h3>Groceries List</h3>
          <h3>Fruits and Veggies</h3>
          <h3>Bread & Pastries</h3>
          <h3>Meat and Fish</h3>
          <h3>Ingredients & Spices</h3>
          <h3>Frozen & Convenience</h3>
        </div>
      </AppLayout>
    </>
  );
};

export default App;
