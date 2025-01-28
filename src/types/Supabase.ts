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
      user_metadata: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};
