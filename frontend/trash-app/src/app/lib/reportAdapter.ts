import { apiUrl } from "./config";

export type ReportTuple = [
  number,
  string,
  string | null,
  string | null,
  number,
  number,
  number,
];

export interface Report {
  id: number;
  username: string;
  imagePath: string | null;
  imageUrl: string | null;
  trashType: string;
  latitude: number;
  longitude: number;
  reportedAt: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
}

export interface FooterStats {
  plastic: number;
  paper: number;
  glass: number;
  metal: number;
  organic: number;
  regular: number;
}

export function createEmptyFooterStats(): FooterStats {
  return {
    plastic: 0,
    paper: 0,
    glass: 0,
    metal: 0,
    organic: 0,
    regular: 0,
  };
}

export function reportTupleToReport(tuple: ReportTuple): Report {
  const [id, username, imagePath, trashType, latitude, longitude, reportedAt] = tuple;

  return {
    id,
    username,
    imagePath,
    imageUrl: resolveReportImageUrl(imagePath),
    trashType: trashType?.trim() || "Unknown",
    latitude: Number(latitude),
    longitude: Number(longitude),
    reportedAt: Number(reportedAt),
  };
}

export function reportTuplesToReports(payload: unknown): Report[] {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .filter((item): item is ReportTuple => Array.isArray(item) && item.length === 7)
    .map(reportTupleToReport);
}

export function leaderboardPayloadToEntries(payload: Record<string, number>): LeaderboardEntry[] {
  return Object.entries(payload)
    .map(([username, points]) => ({ username, points }))
    .sort((left, right) => right.points - left.points || left.username.localeCompare(right.username))
    .map((entry, index) => ({
      rank: index + 1,
      username: entry.username,
      points: entry.points,
    }));
}

export function buildFooterStats(reports: Report[]) {
  const stats = createEmptyFooterStats();

  for (const report of reports) {
    const trashKey = getTrashTypeKey(report.trashType);

    if (trashKey) {
      stats[trashKey] += 1;
    }
  }

  return stats;
}

export function formatReportedAt(reportedAt: number) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(reportedAt * 1000));
}

export function isValidMapCoordinate(report: Pick<Report, "latitude" | "longitude">) {
  return (
    Number.isFinite(report.latitude) &&
    Number.isFinite(report.longitude) &&
    report.latitude >= -90 &&
    report.latitude <= 90 &&
    report.longitude >= -180 &&
    report.longitude <= 180
  );
}

function getTrashTypeKey(trashType: string): keyof FooterStats | null {
  const normalizedType = trashType.trim().toLowerCase();

  switch (normalizedType) {
    case "plastic":
      return "plastic";
    case "paper":
      return "paper";
    case "glass":
      return "glass";
    case "metal":
      return "metal";
    case "organic":
      return "organic";
    case "regular":
      return "regular";
    default:
      return null;
  }
}

function resolveReportImageUrl(imagePath: string | null) {
  if (!imagePath) {
    return null;
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:") ||
    imagePath.startsWith("blob:")
  ) {
    return imagePath;
  }

  const normalizedPath = imagePath.replace(/\\/g, "/");
  const imageSegmentIndex = normalizedPath.lastIndexOf("/images/");

  if (imageSegmentIndex >= 0) {
    return apiUrl(normalizedPath.slice(imageSegmentIndex));
  }

  const relativeImageIndex = normalizedPath.lastIndexOf("images/");

  if (relativeImageIndex >= 0) {
    return apiUrl(`/${normalizedPath.slice(relativeImageIndex)}`);
  }

  const filename = normalizedPath.split("/").filter(Boolean).pop();

  if (!filename) {
    return null;
  }

  return apiUrl(`/images/${encodeURIComponent(filename)}`);
}
