import JSZip from "jszip";
import { EXTENSION_FILES } from "../data/extensionFiles";

// Generate a simple SVG-based PNG canvas data for Chrome Extension icons
function createIconCanvas(size: number): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Rounded background gradient
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, "#2563eb");
      gradient.addColorStop(1, "#1d4ed8");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Shield / Eye icon
      ctx.fillStyle = "#ffffff";
      ctx.font = `${Math.floor(size * 0.55)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🛡️", size / 2, size / 2 + size * 0.04);
    }

    canvas.toBlob((blob) => {
      resolve(blob || new Blob([]));
    }, "image/png");
  });
}

export async function downloadExtensionZip() {
  const zip = new JSZip();

  // Add all source files
  for (const file of EXTENSION_FILES) {
    zip.file(file.path, file.content);
  }

  // Create icons directory and add 16, 48, 128 px icons
  const iconsFolder = zip.folder("icons");
  if (iconsFolder) {
    const icon16 = await createIconCanvas(16);
    const icon48 = await createIconCanvas(48);
    const icon128 = await createIconCanvas(128);

    iconsFolder.file("icon16.png", icon16);
    iconsFolder.file("icon48.png", icon48);
    iconsFolder.file("icon128.png", icon128);
  }

  // Generate ZIP blob
  const zipBlob = await zip.generateAsync({ type: "blob" });

  // Trigger browser download
  const downloadUrl = URL.createObjectURL(zipBlob);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = "ai-code-detector-extension.zip";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}
