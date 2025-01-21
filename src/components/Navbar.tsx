import { Bell, Map, Trophy, User } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border z-50 py-2 px-4 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="container flex items-center justify-around max-w-lg mx-auto">
        <NavLink to="/" icon={<Map className="w-6 h-6" />} label="Map" />
        <NavLink to="/report" icon={<Bell className="w-6 h-6" />} label="Report" />
        <NavLink to="/leaderboard" icon={<Trophy className="w-6 h-6" />} label="Leaderboard" />
        <NavLink to="/profile" icon={<User className="w-6 h-6" />} label="Profile" />
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}