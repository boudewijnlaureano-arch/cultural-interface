import { useState } from "react";

const CATEGORIES = ["Hot", "Trending", "New", "Sale"];

export function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("Hot");

  return (
    <div className="bg-white border-b border-neutral-200 px-2 pb-2">
      <div className="flex gap-1.5 text-xs">
        {CATEGORIES.map((category) => {
          const isActive = category === activeTab;
          return (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-3 py-1 rounded-full font-medium transition-colors duration-150 focus:outline-none ${
                isActive
                  ? "bg-rose-100 text-rose-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
