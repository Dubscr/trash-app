import {
  LeaderboardEntry,
  Report,
  buildFooterStats,
  leaderboardPayloadToEntries,
  reportTuplesToReports,
} from "./reportAdapter";
import { apiUrl } from "./config";

interface CreateReportInput {
  image: File;
  latitude: number;
  longitude: number;
  trashType: string;
  username: string;
}

interface CreateReportResponse {
  message: string;
  reported_at: number;
}

export async function fetchReports() {
  const payload = await fetchJson<unknown>("/reports");
  return reportTuplesToReports(payload);
}

export async function fetchDailyStats() {
  const payload = await fetchJson<unknown>("/reports/daily");
  return buildFooterStats(reportTuplesToReports(payload));
}

export async function fetchReportsByUser(username: string) {
  const payload = await fetchJson<unknown>(`/reports/user/${encodeURIComponent(username)}`);
  const reports = reportTuplesToReports(payload);

  return reports.sort((left, right) => right.reportedAt - left.reportedAt);
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const payload = await fetchJson<Record<string, number>>("/reports/leaderboard");
  return leaderboardPayloadToEntries(payload);
}

export async function createReport(input: CreateReportInput) {
  const formData = new FormData();
  formData.append("image", input.image);
  formData.append("username", input.username);
  formData.append("trash_type", input.trashType);
  formData.append("latitude", String(input.latitude));
  formData.append("longitude", String(input.longitude));

  return fetchJson<CreateReportResponse>("/reports", {
    method: "POST",
    body: formData,
  });
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), init);

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorPayload = (await response.json()) as { error?: string; message?: string };
      message = errorPayload.error || errorPayload.message || message;
    } catch {
      const errorText = await response.text();
      message = errorText || message;
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
