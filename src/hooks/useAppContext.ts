import { useContext } from 'react';
import { ModalContext } from '../ui/Modal';

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) throw new Error('Context must be used into Provider');

  return context;
}
