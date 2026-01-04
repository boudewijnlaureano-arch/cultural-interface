const ACTIONS = [
  { icon: "🔥", label: "Hot Deals" },
  { icon: "⭐", label: "New" },
  { icon: "💎", label: "Premium" },
  { icon: "🎁", label: "Rewards" },
  { icon: "🛍️", label: "Shop" },
];

export function QuickActions() {
  return (
    <div className="bg-white border-b-4 border-neutral-100">
      <div className="grid grid-cols-5 gap-2 px-2 py-3">
        {ACTIONS.map((action) => (
          <div key={action.label} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-300 to-rose-400 rounded-xl flex items-center justify-center text-lg shadow-sm">
              {action.icon}
            </div>
            <span className="text-[10px] text-neutral-600 font-medium text-center leading-tight">
              {action.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
