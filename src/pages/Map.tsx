export default function Map() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <main className="container max-w-lg mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Issue Map</h1>
          <p className="text-muted-foreground">View issues in your area</p>
        </header>
        
        <section className="space-y-4">
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Map View</h2>
            <p className="text-muted-foreground">Coming soon: Interactive map will be implemented here</p>
          </div>
        </section>
      </main>
    </div>
  );
}