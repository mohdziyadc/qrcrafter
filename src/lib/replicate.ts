import Replicate from "replicate";
import { QRCodeControlNetRequest, QRCodeControlNetResponse } from "./types";

export class ReplicateClient {
  replicate: Replicate;
  constructor(apiKey: string) {
    this.replicate = new Replicate({
      auth: apiKey,
    });
  }

  generateQRCode = async (
    request: QRCodeControlNetRequest
  ): Promise<string> => {
    const output = (await this.replicate.run(
      "zylim0702/qr_code_controlnet:628e604e13cf63d8ec58bd4d238474e8986b054bc5e1326e50995fdbc851c557",
      {
        input: {
          url: request.url,
          prompt: request.prompt,
          qr_conditioning_scale: request.qr_conditioning_scale,
          num_inference_steps: request.num_inference_steps,
          guidance_scale: request.guidance_scale,
          negative_prompt: request.negative_prompt,
        },
      }
    )) as QRCodeControlNetResponse;

    if (!output) {
      throw new Error("Failed to generate QR Code");
    }
    return output[0];
  };
}

const apiKey = process.env.REPLICATE_API_KEY as string;

export const replicateClient = new ReplicateClient(apiKey);
