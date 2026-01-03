import { useState } from "react";

export type ContentCardProps = {
  title: string;
  blockId: number;
  hasHoverInfo: boolean;
  variant: "square" | "tall";
  pfp: { label: string; src: string };
  contentImage: { label: string; src: string };
  onHoverStart: (target: HTMLDivElement) => void;
  onHoverEnd: () => void;
  onPfpClick?: (target: HTMLDivElement) => void;
  onCardClick?: (target: HTMLDivElement) => void;
};

export function ContentCard({
  blockId,
  pfp,
  variant,
  contentImage,
  hasHoverInfo,
  onHoverStart,
  onHoverEnd,
  onPfpClick,
  onCardClick,
}: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPfpHovered, setIsPfpHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasHoverInfo) {
      setIsHovered(true);
      // Don't call onHoverStart - we only show panel on click now
    }
  };

  const handleMouseLeave = () => {
    if (hasHoverInfo) {
      setIsHovered(false);
      onHoverEnd(); // This will clear the clicked panel
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasHoverInfo && onCardClick) {
      onCardClick(e.currentTarget);
    }
  };

  return (
    <div
      data-block-id={blockId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`
        relative group
        ${variant === "square" ? "aspect-square" : "h-80"}
        overflow-hidden
        rounded-3xl
        bg-white
        border border-neutral-200
        shadow-sm
        flex flex-col
        ${hasHoverInfo ? "cursor-pointer" : ""}
      `}
    >
      {/* Info Chip - appears on hover */}
      {hasHoverInfo && (
        <div
          className={`
            absolute top-3 left-3 z-10
            bg-black/70 backdrop-blur-sm
            text-white px-3 py-1.5 rounded-full
            text-xs font-medium
            flex items-center gap-1.5
            transition-all duration-250
            ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }
          `}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              fill="black"
              d="M11 11h2v6h-2v-6zm0-4h2v2h-2V7z"
            />
          </svg>
          <span>Click for info</span>
        </div>
      )}

      <div className="h-2/3 w-full">
        <img
          src={contentImage.src}
          alt={contentImage.label}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group/pfp relative"
          onMouseEnter={() => setIsPfpHovered(true)}
          onMouseLeave={() => setIsPfpHovered(false)}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            if (onPfpClick) {
              onPfpClick(e.currentTarget);
            }
          }}
        >
          <img
            src={pfp.src}
            alt="Profile"
            className="h-6 w-6 rounded-full object-cover ring-2 ring-transparent group-hover/pfp:ring-blue-400 transition-all"
          />
          <span className="text-xs font-semibold text-neutral-800 group-hover/pfp:text-blue-600 transition-colors">
            {pfp.label}
          </span>
          {/* Info icon indicator */}
          <div
            className={`ml-auto transition-all duration-200 ${
              isPfpHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-1"
            }`}
          >
            <svg
              className="w-3 h-3 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <path fill="white" d="M11 11h2v6h-2v-6zm0-4h2v2h-2V7z" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-neutral-600 line-clamp-2">
          A sample description of the content block, providing some context.
        </p>
      </div>
    </div>
  );
}
