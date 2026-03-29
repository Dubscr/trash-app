import { Banana, FileText, Wine, Wrench, Trash2 } from "lucide-react";
import { FooterStats } from "../lib/reportAdapter";

interface FooterProps {
  stats: FooterStats;
}

export function Footer({ stats }: FooterProps) {
  const categories = [
    { name: "Plastic", count: stats.plastic, Icon: Trash2 },
    { name: "Paper", count: stats.paper, Icon: FileText },
    { name: "Glass", count: stats.glass, Icon: Wine },
    { name: "Metal", count: stats.metal, Icon: Wrench },
    { name: "Organic", count: stats.organic, Icon: Banana },
    { name: "Regular", count: stats.regular, Icon: Trash2 },
  ];

  return (
    <footer
      style={{ backgroundColor: 'var(--charcoal-brown)' }}
      className="py-6 px-8"
    >
      <div className="mb-3 text-center" style={{ color: 'var(--ivory)' }}>
        Trash picked up in the last 24 hours
      </div>
      <div className="flex items-center justify-center gap-8">
        {categories.map(({ name, count, Icon }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--ivory)' }}
            >
              <div className="flex flex-col items-center">
                <Icon size={24} style={{ color: 'var(--fern)' }} />
                <span style={{ color: 'var(--fern)' }} className="mt-1">{count}</span>
              </div>
            </div>
            <span style={{ color: 'var(--ivory)' }} className="text-sm">{name}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}
