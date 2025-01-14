import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <>
      <AppLayout>
        <div>
          <p>My Lists</p>
          <p>Recenty Used</p>
        </div>
        <div>
          <h3>Groceries List</h3>
          <span>Fruits and Veggies</span>
          <span>Bread & Pastries</span>
          <span>Meat and Fish</span>
          <span>Ingredients & Spices</span>
          <span>Frozen & Convenience</span>
        </div>
      </AppLayout>
    </>
  );
}

export default App;
