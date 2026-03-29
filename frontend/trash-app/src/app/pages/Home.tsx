import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { ReportMap } from "../components/ReportMap";
import { fetchDailyStats, fetchLeaderboard, fetchReports } from "../lib/api";
import {
  FooterStats,
  LeaderboardEntry,
  createEmptyFooterStats,
} from "../lib/reportAdapter";

export function Home() {
  const [reports, setReports] = useState<Awaited<ReturnType<typeof fetchReports>>>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<FooterStats>(createEmptyFooterStats());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadHomePageData() {
      setIsLoading(true);
      setError(null);

      try {
        const [nextReports, nextLeaderboard, nextStats] = await Promise.all([
          fetchReports(),
          fetchLeaderboard(),
          fetchDailyStats(),
        ]);

        if (!isCancelled) {
          setReports(nextReports);
          setLeaderboardData(nextLeaderboard);
          setStats(nextStats);
        }
      } catch (loadError) {
        if (!isCancelled) {
          setError(
            loadError instanceof Error ? loadError.message : "Unable to load homepage data.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadHomePageData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 min-h-[32rem]">
        {/* Map - 2/3 width */}
        <div className="w-2/3" style={{ backgroundColor: 'var(--lavender-grey)' }}>
          <ReportMap reports={reports} isLoading={isLoading} />
        </div>

        {/* Leaderboard - 1/3 width */}
        <div className="w-1/3" style={{ backgroundColor: 'var(--ivory)' }}>
          <div className="p-6">
            <h2 style={{ color: 'var(--fern)' }} className="mb-6 text-center">
              Leaderboard
            </h2>
            {error ? (
              <div
                className="mb-4 rounded p-3 text-sm"
                style={{ backgroundColor: "rgba(192, 133, 82, 0.12)", color: "var(--charcoal-brown)" }}
              >
                {error}
              </div>
            ) : null}
            <div className="space-y-3">
              {!isLoading && leaderboardData.length === 0 ? (
                <div style={{ color: "var(--charcoal-brown)" }}>No reports yet.</div>
              ) : null}
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-3 rounded"
                  style={{ backgroundColor: 'rgba(134, 147, 171, 0.1)' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: user.rank <= 3 ? 'var(--golden-chestnut)' : 'var(--lavender-grey)',
                        color: 'var(--ivory)',
                      }}
                    >
                      {user.rank}
                    </span>
                    <span style={{ color: 'var(--fern)' }}>{user.username}</span>
                  </div>
                  <span style={{ color: 'var(--fern)' }}>{user.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer stats={stats} />
    </div>
  );
}
