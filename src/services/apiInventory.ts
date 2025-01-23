import supabase from './supabase';
import { Database } from '../types/database.types';

type InventoryItem = Database['public']['Tables']['inventory_items']['Row'];
type InsertInventoryItem = Database['public']['Tables']['inventory_items']['Insert'];
type UpdateInventoryItem = Database['public']['Tables']['inventory_items']['Update'];

export const getInventoryItems = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inventory:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem[];
};

export const createInventoryItem = async (item: Omit<InsertInventoryItem, 'user_id'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  // Remove the id from the item object since Supabase will generate it
  const { id, ...itemWithoutId } = item;

  const { data, error } = await supabase
    .from('inventory_items')
    .insert([{ ...itemWithoutId, user_id: user.id }])
    .select()
    .single();

  if (error) {
    console.error('Error creating inventory item:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem;
};

export const updateInventoryItem = async (id: string, updates: Omit<UpdateInventoryItem, 'user_id'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('inventory_items')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating inventory item:', error);
    throw new Error(error.message);
  }

  return data as InventoryItem;
};

export const deleteInventoryItem = async (id: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from('inventory_items')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting inventory item:', error);
    throw new Error(error.message);
  }
}; 