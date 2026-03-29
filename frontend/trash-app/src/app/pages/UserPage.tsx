import { useEffect, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCurrentUser } from "../context/CurrentUserContext";
import { fetchReportsByUser } from "../lib/api";
import { Report, formatReportedAt } from "../lib/reportAdapter";

export function UserPage() {
  const { currentUser } = useCurrentUser();
  const [submissions, setSubmissions] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadUserReports() {
      setIsLoading(true);
      setError(null);

      try {
        const nextSubmissions = await fetchReportsByUser(currentUser.username);

        if (!isCancelled) {
          setSubmissions(nextSubmissions);
        }
      } catch (loadError) {
        if (!isCancelled) {
          setError(
            loadError instanceof Error ? loadError.message : "Unable to load user reports.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadUserReports();

    return () => {
      isCancelled = true;
    };
  }, [currentUser.username]);

  return (
    <div className="flex-1 overflow-y-auto py-8 px-8" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="max-w-5xl mx-auto">
        <h1 style={{ color: 'var(--fern)' }} className="mb-8 text-center">
          My Submissions
        </h1>
        <p className="mb-6 text-center" style={{ color: "var(--charcoal-brown)" }}>
          Viewing reports for {currentUser.label}
        </p>

        {error ? (
          <div
            className="mb-6 rounded p-3 text-sm"
            style={{ backgroundColor: "rgba(192, 133, 82, 0.12)", color: "var(--charcoal-brown)" }}
          >
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div style={{ color: "var(--charcoal-brown)" }}>Loading submissions...</div>
        ) : null}

        {!isLoading && submissions.length === 0 ? (
          <div style={{ color: "var(--charcoal-brown)" }}>
            No submissions found for {currentUser.label} yet.
          </div>
        ) : null}

        <div className="space-y-6">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="relative rounded-lg overflow-hidden"
              style={{ height: '300px' }}
            >
              <ImageWithFallback
                src={submission.imageUrl || ""}
                alt={`${submission.trashType} submission`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlays */}
              <div
                className="absolute top-4 left-4 px-4 py-2 rounded"
                style={{ backgroundColor: 'rgba(52, 54, 51, 0.8)', color: 'var(--ivory)' }}
              >
                {submission.trashType}
              </div>
              
              <div
                className="absolute top-4 right-4 px-4 py-2 rounded"
                style={{ backgroundColor: 'rgba(52, 54, 51, 0.8)', color: 'var(--ivory)' }}
              >
                {formatReportedAt(submission.reportedAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
