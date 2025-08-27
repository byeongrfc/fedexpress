import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function storeImage(input: File | Buffer): Promise<string> {
  let buffer: Buffer;

  if (input instanceof File) {
    const arrayBuffer = await input.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  } else {
    buffer = input;
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });

  return (result as UploadApiResponse).secure_url;
}

export { cloudinary };
