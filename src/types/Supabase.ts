// src/types/supabase.ts
export type Database = {
    public: {
      Tables: {
        inventory_items: {
          Row: {
            id: string; // UUID
            user_id: string; // UUID
            name: string; // Text
            quantity: number | null; // Numeric
            unit: string; // Text
            expiry_date: string | null; // Date
            created_at: string; // Timestamp
            updated_at: string; // Timestamp
          };
          Insert: {
            user_id: string; // UUID
            name: string; // Text
            quantity?: number | null; // Numeric
            unit: string; // Text
            expiry_date?: string | null; // Date
          };
          Update: {
            user_id?: string; // UUID
            name?: string; // Text
            quantity?: number | null; // Numeric
            unit?: string; // Text
            expiry_date?: string | null; // Date
          };
        };
      };
    };
  };