"use client";
import {
  AiUrlResponse,
  AiContactResponse,
  AiFreeTextResponse,
  AiMultiUrlResponse,
  AiAnonContactResponse,
} from "@/lib/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ImageContextProps = {
  image:
    | AiUrlResponse
    | AiMultiUrlResponse
    | AiFreeTextResponse
    | AiContactResponse
    | AiAnonContactResponse;
  setImage: Dispatch<
    SetStateAction<
      | AiUrlResponse
      | AiMultiUrlResponse
      | AiFreeTextResponse
      | AiContactResponse
      | AiAnonContactResponse
    >
  >;
};
const ImageContext = createContext<ImageContextProps>({
  image: {
    image_url: "",
    latency_ms: 0,
    token: "",
    user_url: "", //defaulting it to URL QR
    name: "",
  },
  setImage: () => {
    return {
      image_url: "",
      latency_ms: 0,
      token: "",
      user_url: "",
      name: "",
    };
  },
});

type Props = {
  children: ReactNode;
};

export const ImageContextProvider = ({ children }: Props) => {
  const [imageUrl, setImageUrl] = useState<
    AiUrlResponse | AiMultiUrlResponse | AiFreeTextResponse | AiContactResponse
  >({
    user_url: "",
    image_url: "",
    latency_ms: 0,
    token: "",
    name: "",
  });

  return (
    <ImageContext.Provider value={{ image: imageUrl, setImage: setImageUrl }}>
      {children}
    </ImageContext.Provider>
  );
};
export const useImage = () => useContext(ImageContext);
