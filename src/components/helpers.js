export function isColorDark(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance < 128;
}

export function isVideo(filename) {
  if (typeof filename !== "string") return false;
  const videoExts = [
    "mp4",
    "mov",
    "webm",
    "avi",
    "mkv",
    "ogg",
    "flv",
    "wmv",
    "m4v",
    "3gp",
  ];
  const parts = filename.split(".");
  if (parts.length < 2) return false;
  const ext = parts.pop().toLowerCase();
  return videoExts.includes(ext);
}
