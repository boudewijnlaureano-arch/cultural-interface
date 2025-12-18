import * as React from "react";

export type ContentCardProps = {
  title: string;
  blockId: number;
  hasHoverInfo: boolean;
  variant: "square" | "tall";
  pfp: { label: string; src: string };
  contentImage: { label: string; src: string };
  onHoverStart: (target: HTMLDivElement) => void;
  onHoverEnd: () => void;
};

export function ContentCard({
  blockId,
  pfp,
  variant,
  contentImage,
  hasHoverInfo,
  onHoverStart,
  onHoverEnd,
}: ContentCardProps) {
  return (
    <div
      data-block-id={blockId}
      onMouseEnter={
        hasHoverInfo ? (e) => onHoverStart(e.currentTarget) : undefined
      }
      onMouseLeave={hasHoverInfo ? onHoverEnd : undefined}
      className={`
        relative group
        ${variant === "square" ? "aspect-square" : "h-80"}
        overflow-hidden
        rounded-3xl
        bg-white
        border border-neutral-200
        shadow-sm
        flex flex-col
      `}
    >
      <img
        src={contentImage.src}
        alt="Content"
        className="h-2/3 w-full object-cover"
      />
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <img
            src={pfp.src}
            alt="Profile"
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-xs font-semibold text-neutral-800">
            {pfp.label}
          </span>
        </div>
        <p className="text-xs text-neutral-600 line-clamp-2">
          A sample description of the content block, providing some context.
        </p>
      </div>
    </div>
  );
}
