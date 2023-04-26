import { useContext } from 'react';
import { ModalizeContext } from '../contexts/ModalizeContext';

export function useModalize() {
  return useContext(ModalizeContext);
};