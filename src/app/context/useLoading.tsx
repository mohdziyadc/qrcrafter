"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface LoadingContextProps {
  loading: string;
  setLoading: Dispatch<SetStateAction<string>>;
}

const LoadingContext = createContext<LoadingContextProps>({
  loading: "",
  setLoading: (): string => "",
});

type Props = {
  children: ReactNode;
};
export const LoadingContextProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState("");

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
