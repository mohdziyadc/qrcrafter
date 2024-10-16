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
  qr_name: string;
  qr_conditioning_scale?: number;
  num_inference_steps?: number;
};

export type QRInputResponse = {
  image_url: string;
  latency_ms: number;
  token: string; //uniqueId of generated qrCode
};

/**
 * For saving QR code to DB
 */
export type saveAiQRCode = {
  name: string;
  url: string;
  token: string;
  imageUrl: string;
};

/**
 * Our system has multiple responses. Mainly:
 * 1. Ai URL QR Code
 * 2. Ai Multi URL QR Code
 * 3. Ai FreeText Qr Code
 * 4. Ai Contact QR Code
 * So I think its better to create each response type in order to avoid coupling.
 */
export type AiUrlQr = {
  name: string;
  user_url: string;
};
export type AiMultiUrlQr = {
  name: string;
  user_urls: string[];
  user_titles: string[];
};

export type AiFreeTextQr = {
  name: string;
  user_free_text: string;
};

export type AiContactQr = {
  user_first_name: string;
  user_last_name: string;
  user_organisation: string;
  user_email: string;
  user_phone_number: string;
};

/**
 * TODO:
 * 1. Create a base type of QRInputResponse with image_url, token, latency_ms
 * 2. Create different types of AiQR's
 * 3. In the api/aiqrcode/type/route.ts => use the union of these two types as each POST request's response
 * 4. Change the image context hook according to the different types. (This would be scalable and less coupled)
 *
 */

export type AiUrlResponse = QRInputResponse & AiUrlQr;
export type AiMultiUrlResponse = QRInputResponse & AiMultiUrlQr;
export type AiFreeTextResponse = QRInputResponse & AiFreeTextQr;
export type AiContactResponse = QRInputResponse & AiContactQr;
export type AiAnonContactResponse = QRInputResponse &
  AiContactQr & { name: string };
