export function About() {
  return (
    <div className="flex-1 py-12 px-8" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 style={{ color: 'var(--fern)' }} className="mb-6">
          About Our Trash Reporting Platform
        </h1>

        <div className="space-y-6" style={{ color: 'var(--fern)' }}>
          <p>
            Welcome to our community-driven trash reporting platform. Our mission is to help keep our neighborhoods clean by making it easy for citizens to report and track trash pickups in their area.
          </p>

          <p>
            This platform allows users to upload images of trash they've collected, mark the location, and contribute to a cleaner environment. By participating, you'll earn points and climb the leaderboard while making a real difference in your community.
          </p>

          <h2 className="mt-8 mb-4">How It Works</h2>
          
          <p>
            Simply take a photo of the trash you've collected, upload it through our platform, select the type of waste, and submit. Your contribution will be tracked, and you'll earn points based on the type and amount of trash collected.
          </p>

          <h2 className="mt-8 mb-4">Our Mission</h2>

          <p>
            We believe that small actions can lead to big changes. By working together as a community, we can create cleaner, healthier neighborhoods for everyone. Join us in making a difference, one piece of trash at a time.
          </p>

          <p>
            Thank you for being part of our community and helping to keep our environment clean!
          </p>
        </div>
      </div>
    </div>
  );
}
