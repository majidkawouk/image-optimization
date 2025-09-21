import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    const qualityMap = {
      Eco: "auto:low",
      Good: "auto:good",
      Best: "auto:best",
      Auto: "auto",
    };

    const qualityValue = qualityMap[formData.get("quality")] || "auto";

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "my_app_uploads",
          width: formData.get("width") || undefined,
          height: formData.get("height") || undefined,
          crop: formData.get("cropMode")?.toLowerCase() || "fill",
          format:
            formData.get("format") === "Auto (f_auto)"
              ? undefined
              : formData.get("format")?.toLowerCase(),
          quality: qualityValue,
          dpr: formData.get("dpr") === "true" ? "auto" : undefined,
          chroma_subsampling:
            formData.get("chromaSub") === "true" ? "4:2:0" : undefined,
          gravity: formData.get("autoCrop") === "true" ? "auto" : undefined,
        },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );

      uploadStream.end(buffer);
    });

    return new Response(JSON.stringify({ url: result.secure_url, size: result.bytes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Upload failed", details: err.message }),
      {
        status: 500,
      }
    );
  }
}
