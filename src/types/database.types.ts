export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      grocery_lists: {
        Row: {
          id: number;
          grocery_list_name: string;
          grocery_list_items: string;
          recently_used: string;
          color: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          grocery_list_name: string;
          grocery_list_items?: string;
          recently_used?: string;
          color?: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          grocery_list_name?: string;
          grocery_list_items?: string;
          recently_used?: string;
          color?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      inventory_items: {
        Row: {
          id: string;
          name: string;
          quantity: number;
          unit: "carton" | "pack" | "grams" | "pieces";
          expiry_date: string | null;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          quantity: number;
          unit: "carton" | "pack" | "grams" | "pieces";
          expiry_date?: string | null;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          quantity?: number;
          unit?: "carton" | "pack" | "grams" | "pieces";
          expiry_date?: string | null;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
