export type QRCodeControlNetRequest = {
  url: string;
  prompt: string;
  qr_conditioning_scale?: number;
  num_inference_steps?: number;
  guidance_scale?: string;
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
  image_url: string;
  latency_ms: number;
  id: string; //uniqueId of generated qrCode
};
