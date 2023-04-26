import { createContext, ReactNode, useState } from 'react';

type ModalizeContextProps = {
  
};

type ModalizeProviderProps = {
  children: ReactNode;
};

export const ModalizeContext = createContext({} as ModalizeContextProps);

export function ModalizeProvider({ children }: ModalizeProviderProps) {
  return (
    <ModalizeContext.Provider value={{ }}>
      {children}
    </ModalizeContext.Provider>
  );
};