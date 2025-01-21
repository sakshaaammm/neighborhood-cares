export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-lg mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Top contributors in your area</p>
        </header>
        
        <section className="space-y-4">
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">This Month's Leaders</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-primary">1</span>
                  <span>John Doe</span>
                </div>
                <span className="font-semibold">450 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-primary">2</span>
                  <span>Jane Smith</span>
                </div>
                <span className="font-semibold">380 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-primary">3</span>
                  <span>Mike Johnson</span>
                </div>
                <span className="font-semibold">310 pts</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}