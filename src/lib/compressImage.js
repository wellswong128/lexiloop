const DEFAULT_MAX_EDGE = 1600;
const DEFAULT_QUALITY = 0.82;
const DEFAULT_MIME_TYPE = "image/jpeg";

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read this image file."));
    };

    image.src = objectUrl;
  });
}

function getScaledSize(width, height, maxEdge) {
  const longestEdge = Math.max(width, height);

  if (longestEdge <= maxEdge) {
    return { height, width };
  }

  const scale = maxEdge / longestEdge;

  return {
    height: Math.round(height * scale),
    width: Math.round(width * scale),
  };
}

export async function compressImageFile(
  file,
  { maxEdge = DEFAULT_MAX_EDGE, quality = DEFAULT_QUALITY } = {},
) {
  if (!file?.type?.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }

  const image = await loadImageFromFile(file);
  const { width, height } = getScaledSize(image.width, image.height, maxEdge);
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not prepare image compression.");
  }

  context.drawImage(image, 0, 0, width, height);

  const dataUrl = canvas.toDataURL(DEFAULT_MIME_TYPE, quality);

  return {
    dataUrl,
    height,
    mimeType: DEFAULT_MIME_TYPE,
    previewUrl: dataUrl,
    width,
  };
}
