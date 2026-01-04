export function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-rose-300 to-rose-400 mx-2 mt-2 mb-2 p-3 rounded-xl flex justify-between items-center shadow-sm">
      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
        <span className="text-base">⚡</span>
        <span>Flash Sale - 50% OFF</span>
      </div>
      <div className="bg-white text-rose-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">
        HOT
      </div>
    </div>
  );
}
