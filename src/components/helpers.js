export function isColorDark(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance < 128;
}

const youtubeRegex =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i;

export function isYouTubeLink(url) {
  if (typeof url !== "string") return false;
  return youtubeRegex.test(url) || /(?:youtube\.com|youtu\.be)/i.test(url);
}

export function getYouTubeId(url) {
  if (typeof url !== "string") return undefined;

  const match = url.match(youtubeRegex);
  if (match && match[1]) return match[1];

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const pathParts = parsed.pathname.split("/").filter(Boolean);

    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }

    if (host.includes("youtu.be") && pathParts.length) {
      return pathParts[0];
    }

    if (host.includes("youtube.com") && pathParts.length >= 2) {
      const [segment, id] = pathParts;
      if ((segment === "shorts" || segment === "embed") && id) return id;
    }
  } catch (e) {
    return undefined;
  }

  return undefined;
}

export function toYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url);
  if (!id) return url || "";
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    controls: "0",
    playsinline: "1",
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function resolveMediaUrl(source, baseFolder = "") {
  if (!source) return "";
  if (source.startsWith("/")) return source;
  if (/^https?:\/\//i.test(source)) return source;
  return `${baseFolder}${source}`;
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
  const ext = parts.pop().toLowerCase().split("?")[0].split("#")[0];
  return videoExts.includes(ext);
}
