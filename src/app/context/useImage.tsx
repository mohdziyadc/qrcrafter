"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ImageContextProps = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};
const ImageContext = createContext<ImageContextProps>({
  image: "",
  setImage: (): string => "",
});

type Props = {
  children: ReactNode;
};

export const ImageContextProvider = ({ children }: Props) => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <ImageContext.Provider value={{ image: imageUrl, setImage: setImageUrl }}>
      {children}
    </ImageContext.Provider>
  );
};
export const useImage = () => useContext(ImageContext);
