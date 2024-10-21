import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as crypto from "crypto";

export class R2Client {
  private static instance: R2Client | null = null;
  private client: S3Client;
  private readonly bucketName: string;
  private r2DevDomain: string;

  private constructor() {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretKey = process.env.R2_SECRET_ACCESS_KEY;
    this.bucketName = process.env.R2_BUCKET_NAME as string;
    this.r2DevDomain = `https://pub-${accountId}.r2.dev`;

    if (!accountId || !accessKeyId || !secretKey || !this.bucketName) {
      throw new Error(
        "Missing required R2 configuration environment variables"
      );
    }

    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretKey,
      },
    });
  }

  public static getClient(): R2Client {
    if (!R2Client.instance) {
      R2Client.instance = new R2Client();
    }
    return R2Client.instance;
  }

  private generateKey(prefix: string) {
    const randomString = crypto.randomBytes(8).toString();
    return `${prefix}-${randomString}.png`;
  }

  public getR2PubUrl(key: string): string {
    return `${this.r2DevDomain}/${key}`;
  }

  public async uploadImage(imageBuffer: Buffer, prefix: string = "qr-codes") {
    const key = this.generateKey(prefix);

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key, //file name
        Body: imageBuffer,
        ContentType: "image/png",
      });

      await this.client.send(command);

      return {
        key,
        url: this.getR2PubUrl(key),
      };
    } catch (error) {
      console.error("Upload failed:", error);
      throw new Error(`Failed to upload image: ${(error as Error).message}`);
    }
  }

  public async urlToBuffer(url: string): Promise<Buffer> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
