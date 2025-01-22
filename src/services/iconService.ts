// import supabase from './supabase';

const defaultEmojis: { [key: string]: string } = {
  milk: '🥛',
  bread: '🍞',
  fruit: '🍎',
  vegetables: '🥬',
  meat: '🥩',
  fish: '🐟',
  drinks: '🥤',
  snacks: '🍪',
  default: '🛍️'
};

export const getItemIcon = async (itemName: string): Promise<string> => {
  const lowerCaseItem = itemName.toLowerCase();
  return defaultEmojis[lowerCaseItem] || defaultEmojis.default;
}; 