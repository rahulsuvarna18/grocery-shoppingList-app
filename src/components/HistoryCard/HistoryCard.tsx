import { memo } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { HistoryCardProps } from "../../types/history.types";

const HistoryCard = memo(({ item, onDelete, itemName, listName }: HistoryCardProps) => (
  <StyledHistoryCard>
    <DeleteButton onClick={() => onDelete(item.id)} title="Delete from history">
      <Trash2 size={16} />
    </DeleteButton>
    <ItemHeader>
      <ItemName>{itemName}</ItemName>
      <DeletedDate>Deleted on: {item.deleted_at ? format(new Date(item.deleted_at), "MMM d, yyyy") : "Unknown date"}</DeletedDate>
    </ItemHeader>
    {item.description && <ItemDescription>{item.description}</ItemDescription>}
    <ListName>List: {listName}</ListName>
  </StyledHistoryCard>
));

HistoryCard.displayName = "HistoryCard";

export default HistoryCard;

const StyledHistoryCard = styled.div`
  position: relative;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const DeletedDate = styled.span`
  font-size: 12px;
  color: #666;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 8px 0;
  font-style: italic;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: #ef4444;
    background: #fee2e2;
  }
`;

const ListName = styled.span`
  font-size: 12px;
  color: #666;
  background: #f0fdf4;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 8px;
  display: inline-block;
`;
