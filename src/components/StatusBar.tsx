type StatusBarProps = {
  variant: "left" | "right";
};

export function StatusBar({ variant }: StatusBarProps) {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const bgColor = variant === "left" ? "bg-blue-100" : "bg-red-100";

  return (
    <div
      className={`h-6 ${bgColor} flex justify-between items-center px-3 pb-1 text-xs font-medium text-gray-700`}
    >
      <span>{currentTime}</span>
      <div className="flex gap-1.5 items-center">
        <svg
          width="14"
          height="10"
          viewBox="0 0 16 12"
          fill="currentColor"
          className="text-gray-700"
        >
          <rect width="2.5" height="5" y="7" rx="0.5" />
          <rect x="4" width="2.5" height="8" y="4" rx="0.5" />
          <rect x="8" width="2.5" height="11" y="1" rx="0.5" />
          <rect x="12" width="2.5" height="12" rx="0.5" />
        </svg>
        <span className="font-semibold">100%</span>
      </div>
    </div>
  );
}
