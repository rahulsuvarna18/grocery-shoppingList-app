export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
      grocery_items: {
        Row: {
          id: number;
          name: string;
          category_id: number | null;
          item_details: string[];
        };
        Insert: {
          id?: number;
          name: string;
          category_id?: number | null;
          item_details?: string[];
        };
        Update: {
          id?: number;
          name?: string;
          category_id?: number | null;
          item_details?: string[];
        };
      };
      inventory_items: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          quantity: number;
          unit: string;
          expiry_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          quantity: number;
          unit: string;
          expiry_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          quantity?: number;
          unit?: string;
          expiry_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      grocery_lists: {
        Row: {
          id: number;
          created_at: string;
          grocery_list_name: string;
          user_id: string;
          color: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          grocery_list_name: string;
          user_id: string;
          color?: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          grocery_list_name?: string;
          user_id?: string;
          color?: string;
        };
      };
      user_grocery_items: {
        Row: {
          id: number;
          user_id: string;
          grocery_list_id: number;
          grocery_item_id: number | null;
          name: string | null;
          category_id: number | null;
          item_details: string[];
          description: string | null;
          is_custom: boolean;
          is_bought: boolean;
          bought_at: string | null;
          added_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          grocery_list_id: number;
          grocery_item_id?: number | null;
          name?: string | null;
          category_id?: number | null;
          item_details?: string[];
          description?: string | null;
          is_custom?: boolean;
          is_bought?: boolean;
          bought_at?: string | null;
          added_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          grocery_list_id?: number;
          grocery_item_id?: number | null;
          name?: string | null;
          category_id?: number | null;
          item_details?: string[];
          description?: string | null;
          is_custom?: boolean;
          is_bought?: boolean;
          bought_at?: string | null;
          added_at?: string;
        };
      };
      user_grocery_item_history: {
        Row: {
          id: number;
          user_grocery_item_id: number;
          user_id: string;
          grocery_list_id: number;
          grocery_item_id: number | null;
          name: string | null;
          category_id: number | null;
          item_details: string[];
          description: string | null;
          is_custom: boolean;
          bought_at: string;
          is_deleted: boolean;
          deleted_at: string | null;
        };
        Insert: {
          id?: number;
          user_grocery_item_id: number;
          user_id: string;
          grocery_list_id: number;
          grocery_item_id?: number | null;
          name?: string | null;
          category_id?: number | null;
          item_details?: string[];
          description?: string | null;
          is_custom?: boolean;
          bought_at?: string;
          is_deleted?: boolean;
          deleted_at?: string | null;
        };
        Update: {
          id?: number;
          user_grocery_item_id?: number;
          user_id?: string;
          grocery_list_id?: number;
          grocery_item_id?: number | null;
          name?: string | null;
          category_id?: number | null;
          item_details?: string[];
          description?: string | null;
          is_custom?: boolean;
          bought_at?: string;
          is_deleted?: boolean;
          deleted_at?: string | null;
        };
      };
      shared_grocery_lists: {
        Row: {
          id: number;
          owner_user_id: string;
          shared_with_user_id: string;
          grocery_list_id: number;
          shared_at: string;
        };
        Insert: {
          id?: number;
          owner_user_id: string;
          shared_with_user_id: string;
          grocery_list_id: number;
          shared_at?: string;
        };
        Update: {
          id?: number;
          owner_user_id?: string;
          shared_with_user_id?: string;
          grocery_list_id?: number;
          shared_at?: string;
        };
      };
    };
  };
}
