"use client";
import { QRInputResponse } from "@/lib/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ImageContextProps = {
  image: QRInputResponse;
  setImage: Dispatch<SetStateAction<QRInputResponse>>;
};
const ImageContext = createContext<ImageContextProps>({
  image: { image_url: "", latency_ms: 0, token: "" },
  setImage: (): QRInputResponse => {
    return { image_url: "", latency_ms: 0, token: "" };
  },
});

type Props = {
  children: ReactNode;
};

export const ImageContextProvider = ({ children }: Props) => {
  const [imageUrl, setImageUrl] = useState<QRInputResponse>({
    image_url: "",
    latency_ms: 0,
    token: "",
  });

  return (
    <ImageContext.Provider value={{ image: imageUrl, setImage: setImageUrl }}>
      {children}
    </ImageContext.Provider>
  );
};
export const useImage = () => useContext(ImageContext);
