const categories = [
  { name: "Todas", icon: "⌂" },
  { name: "Playa", icon: "☀" },
  { name: "Mansiones", icon: "◆" },
  { name: "Tendencias", icon: "↗" },
  { name: "Montana", icon: "△" },
];

type Props = { activeCategory: string; onChange: (category: string) => void };

export const CategoryFilters = ({ activeCategory, onChange }: Props) => (
  <nav className="category-filters" aria-label="Filtrar alojamientos por categoria">
    {categories.map((category) => (
      <button
        type="button"
        className={activeCategory === category.name ? "active" : ""}
        aria-pressed={activeCategory === category.name}
        onClick={() => onChange(category.name)}
        key={category.name}
      >
        <span aria-hidden="true">{category.icon}</span>
        {category.name}
      </button>
    ))}
  </nav>
);
