import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Submission {
  id: string;
  imageUrl: string;
  trashType: string;
  timestamp: string;
  username: string;
  latitude: number;
  longitude: number;
}

export function UserPage() {
  // Mock user submissions - ordered newest to oldest
  const submissions: Submission[] = [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807",
      trashType: "Plastic",
      timestamp: "2026-03-29 14:30",
      username: "EcoWarrior23",
      latitude: 40.7128,
      longitude: -74.0060,
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
      trashType: "Paper",
      timestamp: "2026-03-29 12:15",
      username: "EcoWarrior23",
      latitude: 40.7129,
      longitude: -74.0061,
    },
    {
      id: "3",
      imageUrl: "https://images.unsplash.com/photo-1607096849512-f8e3c1c23c7d",
      trashType: "Glass",
      timestamp: "2026-03-28 16:45",
      username: "EcoWarrior23",
      latitude: 40.7130,
      longitude: -74.0062,
    },
    {
      id: "4",
      imageUrl: "https://images.unsplash.com/photo-1583976571872-a77b4d8c6f6f",
      trashType: "Organic",
      timestamp: "2026-03-28 10:20",
      username: "EcoWarrior23",
      latitude: 40.7131,
      longitude: -74.0063,
    },
    {
      id: "5",
      imageUrl: "https://images.unsplash.com/photo-1609679669960-c1f9d1b0b5e6",
      trashType: "Metal",
      timestamp: "2026-03-27 15:00",
      username: "EcoWarrior23",
      latitude: 40.7132,
      longitude: -74.0064,
    },
    {
      id: "6",
      imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
      trashType: "Regular",
      timestamp: "2026-03-27 09:30",
      username: "EcoWarrior23",
      latitude: 40.7133,
      longitude: -74.0065,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto py-8 px-8" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="max-w-5xl mx-auto">
        <h1 style={{ color: 'var(--fern)' }} className="mb-8 text-center">
          My Submissions
        </h1>

        <div className="space-y-6">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="relative rounded-lg overflow-hidden"
              style={{ height: '300px' }}
            >
              <ImageWithFallback
                src={submission.imageUrl}
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
                {submission.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
