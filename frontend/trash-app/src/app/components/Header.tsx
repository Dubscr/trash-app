import { Link, useLocation } from "react-router";
import { UserPickerDialog } from "./UserPickerDialog";

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/upload", label: "Upload" },
    { path: "/user", label: "My Trash" },
    { path: "/about", label: "About" },
    { path: "/all-users", label: "All Trash" },
  ];

  return (
    <header style={{ backgroundColor: 'var(--charcoal-brown)' }}>
      <div className="flex items-center justify-between px-8 py-4 gap-6">
        <nav className="flex items-center justify-start gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="header-nav-link px-6 py-2 rounded transition-colors"
                style={{
                  backgroundColor: isActive ? 'var(--charcoal-brown)' : 'transparent',
                  color: 'var(--ivory)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--ivory)';
                    e.currentTarget.style.color = 'var(--charcoal-brown)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--ivory)';
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <UserPickerDialog />
      </div>
    </header>
  );
}
