"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
const Context = createContext<ContextProps>({
  loading: false,
  setLoading: (): boolean => false,
});

type Props = {
  children: ReactNode;
};
export const LoadingContextProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{ loading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

export const useLoading = () => useContext(Context);
