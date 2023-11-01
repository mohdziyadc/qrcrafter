export type QRCodeControlNetRequest = {
  url: string;
  prompt: string;
  qr_conditioning_scale?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  negative_prompt?: string;
};

export type QRCodeControlNetResponse = [string];

/**
 * Type of input given by the user as api request
 */
export type QRInputRequest = {
  url: string;
  prompt: string;
  qr_conditioning_scale?: number;
  num_inference_steps?: number;
};

export type QRInputResponse = {
  user_url: string; //To access the url from the qr code card component and save it to DB
  image_url: string;
  latency_ms: number;
  token: string; //uniqueId of generated qrCode
};

/**
 * For saving QR code to DB
 */
export type saveAiQRCode = {
  url: string;
  token: string;
  imageUrl: string;
};
