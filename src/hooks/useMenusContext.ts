import { useContext } from 'react';
import { MenusContext } from '../ui/Menus';

export function useMenusContext() {
  const context = useContext(MenusContext);

  if (!context) throw new Error('Context must be used into Provider');

  return context;
}
