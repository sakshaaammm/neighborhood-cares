export default function Profile() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-lg mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Your activity and achievements</p>
        </header>
        
        <section className="space-y-4">
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <div className="space-y-2">
              <p>Total Points: 225</p>
              <p>Issues Reported: 3</p>
              <p>Issues Resolved: 1</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}