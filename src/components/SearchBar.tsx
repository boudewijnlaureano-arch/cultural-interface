type SearchBarProps = {
  variant: "left" | "right";
};

export function SearchBar({ variant }: SearchBarProps) {
  const placeholder = variant === "left" ? "Search" : "Search products...";

  return (
    <div className="bg-white border-b border-neutral-200 p-2">
      <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-1.5">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-sm text-gray-500">{placeholder}</span>
      </div>
    </div>
  );
}
