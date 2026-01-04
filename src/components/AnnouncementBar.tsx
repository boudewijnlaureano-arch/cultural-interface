export function AnnouncementBar() {
  return (
    <div className="bg-amber-50 border border-amber-200 mx-2 my-2 px-2.5 py-1.5 rounded-lg flex items-center gap-2">
      <div className="w-3.5 h-3.5 bg-amber-400 rounded flex-shrink-0 flex items-center justify-center text-[8px]">
        📢
      </div>
      <div className="text-[10px] text-amber-900 font-medium overflow-hidden whitespace-nowrap">
        🎉 Limited time: Buy 2 Get 1 Free on all items!
      </div>
    </div>
  );
}
