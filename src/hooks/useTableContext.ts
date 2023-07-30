import { useContext } from 'react';
import { TableContext } from '../ui/Table';

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) throw new Error('Context must be used into Provider');

  return context;
}
