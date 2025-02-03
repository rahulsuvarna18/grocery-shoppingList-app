import { useState } from "react";
import styled from "styled-components";
import { Plus, Info, CalendarDays, Package, Pencil, Trash2 } from "lucide-react";
import Modal from "../ui/Modal/Modal";
import { useInventoryItems } from "../services/Queries/useInventoryItems";
import useCreateInventoryItem from "../services/Mutations/useCreateInventoryItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import useUpdateInventoryItem from "../services/Mutations/useUpdateInventoryItem";
import useDeleteInventoryItem from "../services/Mutations/useDeleteInventoryItem";
import EmptyState from "../components/EmptyState/EmptyState";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
`;

const CreateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #45a049;
    transform: translateY(-1px);
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const CardContent = styled.div`
  padding: 24px;
`;

const ItemName = styled.h3`
  font-size: 1.25rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ItemDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 48px 24px;
//   background: #f8fafc;
//   border-radius: 12px;
//   max-width: 600px;
//   margin: 48px auto;
// `;

// const EmptyStateTitle = styled.h2`
//   font-size: 1.25rem;
//   color: #333;
//   margin-bottom: 12px;
// `;

// const EmptyStateText = styled.p`
//   color: #666;
//   line-height: 1.6;
// `;

const InfoButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const QuantityContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const NumberInput = styled(Input)`
  width: 100px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  top: 16px;
  right: 16px;
  opacity: 0;
  transition: opacity 0.2s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const IconButton = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.color === "danger" ? "#fee2e2" : "#f0fdf4")};
    border-color: ${(props) => (props.color === "danger" ? "#ef4444" : "#4caf50")};
    color: ${(props) => (props.color === "danger" ? "#ef4444" : "#4caf50")};
  }
`;

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: "carton" | "pack" | "grams" | "pieces";
  expiry_date: string | null;
}

const Inventory = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    unit: "pieces",
    expiryDate: "",
  });
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const { data: itemsData, isLoading, error } = useInventoryItems();
  const { createItem, isCreating } = useCreateInventoryItem();
  const { updateItem, isUpdating } = useUpdateInventoryItem();
  const { deleteItem, isDeleting } = useDeleteInventoryItem();

  const handleCreateItem = () => {
    if (!newItem.name || !newItem.quantity) return;

    createItem({
      name: newItem.name,
      quantity: Number(newItem.quantity),
      unit: newItem.unit as InventoryItem["unit"],
      expiry_date: newItem.expiryDate || null,
    });

    setIsCreateModalOpen(false);
    setNewItem({ name: "", quantity: "", unit: "pieces", expiryDate: "" });
  };

  const handleEditItem = () => {
    if (!editingItem || !newItem.name || !newItem.quantity) return;

    updateItem({
      id: editingItem.id,
      updates: {
        name: newItem.name,
        quantity: Number(newItem.quantity),
        unit: newItem.unit as InventoryItem["unit"],
        expiry_date: newItem.expiryDate || null,
      },
    });

    setEditingItem(null);
    setIsCreateModalOpen(false);
    setNewItem({ name: "", quantity: "", unit: "pieces", expiryDate: "" });
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error message={error.message} />;

  return (
    <Container>
      <Header>
        <Title>Inventory Management</Title>
        <CreateButton onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} />
          Add Item
        </CreateButton>
      </Header>

      {!itemsData?.length ? (
        <EmptyState title="No Items In Inventory" text="Click the button above to add items to your inventory." />
      ) : (
        <CardsGrid>
          {itemsData.map((item) => (
            <Card key={item.id}>
              <CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => {
                      setEditingItem(item as InventoryItem);
                      setNewItem({
                        name: item.name,
                        quantity: String(item.quantity),
                        unit: item.unit,
                        expiryDate: item.expiry_date || "",
                      });
                      setIsCreateModalOpen(true);
                    }}
                  >
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton color="danger" onClick={() => handleDeleteItem(item.id)} disabled={isDeleting}>
                    <Trash2 size={16} />
                  </IconButton>
                </CardActions>
                <ItemName>{item.name}</ItemName>
                <ItemDetail>
                  <Package size={16} />
                  <span>
                    {item.quantity} {item.unit}
                  </span>
                </ItemDetail>
                {item.expiry_date && (
                  <ItemDetail>
                    <CalendarDays size={16} />
                    <span>Expires: {item.expiry_date}</span>
                  </ItemDetail>
                )}
              </CardContent>
            </Card>
          ))}
        </CardsGrid>
      )}

      <InfoButton onClick={() => setIsInfoModalOpen(true)}>
        <Info size={24} />
      </InfoButton>

      {/* Create Item Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingItem(null);
          setNewItem({ name: "", quantity: "", unit: "pieces", expiryDate: "" });
        }}
      >
        <Modal.Header>{editingItem ? "Edit Inventory Item" : "Add Inventory Item"}</Modal.Header>
        <Modal.Content>
          <Input type="text" placeholder="Item name" value={newItem.name} onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))} />
          <QuantityContainer>
            <NumberInput type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))} />
            <RadioGroup>
              {["pieces", "pack", "carton", "grams"].map((unit) => (
                <RadioLabel key={unit}>
                  <input type="radio" name="unit" value={unit} checked={newItem.unit === unit} onChange={(e) => setNewItem((prev) => ({ ...prev, unit: e.target.value }))} />
                  {unit}
                </RadioLabel>
              ))}
            </RadioGroup>
          </QuantityContainer>
          <Input type="date" value={newItem.expiryDate} onChange={(e) => setNewItem((prev) => ({ ...prev, expiryDate: e.target.value }))} />
        </Modal.Content>
        <Modal.Footer>
          <Modal.Button
            onClick={() => {
              setIsCreateModalOpen(false);
              setEditingItem(null);
              setNewItem({ name: "", quantity: "", unit: "pieces", expiryDate: "" });
            }}
          >
            Cancel
          </Modal.Button>
          <Modal.Button onClick={editingItem ? handleEditItem : handleCreateItem} disabled={isCreating || isUpdating || !newItem.name || !newItem.quantity}>
            {isCreating || isUpdating ? "Saving..." : editingItem ? "Save" : "Create"}
          </Modal.Button>
        </Modal.Footer>
      </Modal>

      {/* Info Modal */}
      <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <Modal.Header>About Inventory Management</Modal.Header>
        <Modal.Content>
          <p>The Inventory Management system helps you keep track of your grocery items, their quantities, and expiry dates. This feature is designed to:</p>
          <ul>
            <li>Prevent food waste by tracking expiry dates</li>
            <li>Maintain optimal stock levels</li>
            <li>Help you plan your shopping more effectively</li>
            <li>Keep track of bulk purchases</li>
          </ul>
        </Modal.Content>
        <Modal.Footer>
          <Modal.Button onClick={() => setIsInfoModalOpen(false)}>Close</Modal.Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Inventory;
