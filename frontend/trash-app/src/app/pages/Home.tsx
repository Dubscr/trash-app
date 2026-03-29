import { Footer } from "../components/Footer";

export function Home() {
  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, username: "EcoWarrior23", points: 1250 },
    { rank: 2, username: "GreenHero", points: 1100 },
    { rank: 3, username: "CleanStreets", points: 980 },
    { rank: 4, username: "TrashHunter", points: 875 },
    { rank: 5, username: "EarthSaver", points: 820 },
    { rank: 6, username: "RecycleKing", points: 750 },
    { rank: 7, username: "NatureLover", points: 690 },
    { rank: 8, username: "GreenThumb", points: 625 },
    { rank: 9, username: "CleanupCrew", points: 580 },
    { rank: 10, username: "EcoFighter", points: 540 },
  ];

  // Mock 24h stats
  const stats = {
    plastic: 142,
    paper: 89,
    glass: 56,
    metal: 34,
    organic: 78,
    regular: 103,
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1">
        {/* Map - 2/3 width */}
        <div className="w-2/3" style={{ backgroundColor: 'var(--lavender-grey)' }}>
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <h2 style={{ color: 'var(--fern)' }} className="mb-4">
                Interactive Map
              </h2>
              <p style={{ color: 'var(--charcoal-brown)' }}>
                Map showing trash report locations with latitude/longitude markers
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard - 1/3 width */}
        <div className="w-1/3" style={{ backgroundColor: 'var(--ivory)' }}>
          <div className="p-6">
            <h2 style={{ color: 'var(--fern)' }} className="mb-6 text-center">
              Leaderboard
            </h2>
            <div className="space-y-3">
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
