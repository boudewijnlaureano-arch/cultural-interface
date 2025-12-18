import * as React from "react";
import { Android } from "./components/ui/shadcn-io/android/android";
import { ScrollInfoBlock, type ScrollInfo } from "./components/ScrollInfoBlock";
import { HoverInfoBlock, type HoverInfo } from "./components/HoverInfoBlock";
import { ContentCard } from "./components/ContentCard.tsx";

type Side = "left" | "right";

const RIGHT_BLOCKS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 6,
  title: `Block ${i + 6}`,
  pfp: { label: "@Yuan ShiMing", src: "/assets/PFPs/kipepeopfp.jpg" },
  contentImage: { label: "kipepeo", src: "/assets/content/kipepeo.jpg" },
}));

const LEFT_BLOCKS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1, // 6..10
  title: `Block ${i + 1}`,
  pfp: { label: "@John Smith", src: "/assets/PFPs/kipepeopfp.jpg" },
  contentImage: { label: "kipepeo", src: "/assets/content/kipepeo.jpg" },
}));

const HOVER_INFO_DATA: Record<number, HoverInfo> = {};

export default function App() {
  const [scrollInfoMap] = React.useState<Record<number, ScrollInfo>>({});
  const [hoverInfoMap] =
    React.useState<Record<number, HoverInfo>>(HOVER_INFO_DATA);
  const [hoveredBlock, setHoveredBlock] = React.useState<{
    id: number;
    side: Side;
    triggerCenterY: number;
  } | null>(null);

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const leftScrollRef = React.useRef<HTMLDivElement | null>(null);
  const rightScrollRef = React.useRef<HTMLDivElement | null>(null);

  // Ref to track which scroll container is being actively scrolled by the user
  // to prevent an infinite loop of scroll events.
  const activeScrollerRef = React.useRef<Side | null>(null);

  const handleLeftScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (activeScrollerRef.current !== "left") return;
    const leftEl = e.currentTarget;
    const leftMaxScroll = leftEl.scrollHeight - leftEl.clientHeight;
    if (leftMaxScroll <= 0) return;

    const rightEl = rightScrollRef.current;
    if (rightEl) {
      const rightMaxScroll = rightEl.scrollHeight - rightEl.clientHeight;
      const scrollPercent = leftEl.scrollTop / leftMaxScroll;
      rightEl.scrollTop = scrollPercent * rightMaxScroll;
    }
  };

  const handleRightScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (activeScrollerRef.current !== "right") return;
    const rightEl = e.currentTarget;
    const rightMaxScroll = rightEl.scrollHeight - rightEl.clientHeight;
    if (rightMaxScroll <= 0) return;

    const leftEl = leftScrollRef.current;
    if (leftEl) {
      const leftMaxScroll = leftEl.scrollHeight - leftEl.clientHeight;
      const scrollPercent = rightEl.scrollTop / rightMaxScroll;
      leftEl.scrollTop = scrollPercent * leftMaxScroll;
    }
  };

  const hoverInfo =
    hoveredBlock && hoverInfoMap[hoveredBlock.id]
      ? { ...hoverInfoMap[hoveredBlock.id], side: hoveredBlock.side }
      : undefined;

  const leftInfo = hoverInfo?.side === "left" ? hoverInfo : undefined;
  const rightInfo = hoverInfo?.side === "right" ? hoverInfo : undefined;

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {/* Wrapper MUST be relative so panels can position next to phones */}
      <div ref={wrapperRef} className="relative flex">
        {/* Left phone (shows blocks 6..10) */}
        <Phone>
          <div className="h-full flex flex-col p-4 gap-3 text-neutral-900 bg-blue-100">
            <div
              ref={leftScrollRef}
              className="flex-1 overflow-y-auto pr-1 scrollable-grid"
              onScroll={handleLeftScroll}
              onMouseEnter={() => (activeScrollerRef.current = "left")}
              onWheel={() => (activeScrollerRef.current = "left")}
            >
              <div className="grid grid-cols-1 gap-3 pb-4">
                {LEFT_BLOCKS.map((b) => (
                  <ContentCard
                    key={b.id}
                    title={b.title}
                    variant="square"
                    blockId={b.id}
                    pfp={b.pfp}
                    contentImage={b.contentImage}
                    hasHoverInfo={Boolean(hoverInfoMap[b.id])}
                    onHoverStart={(target) => {
                      const rect = target.getBoundingClientRect();
                      const wrapperRect =
                        wrapperRef.current?.getBoundingClientRect() ?? {
                          top: 0,
                        };
                      const triggerCenterY =
                        rect.top - wrapperRect.top + rect.height / 2;
                      setHoveredBlock({
                        id: b.id,
                        side: "left",
                        triggerCenterY,
                      });
                    }}
                    onHoverEnd={() => setHoveredBlock(null)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Phone>

        {/* Right phone (shows blocks 1..5) */}
        <Phone>
          <div className="h-full flex flex-col p-2 gap-3 text-neutral-900 bg-red-100">
            <div
              ref={rightScrollRef}
              className="flex-1 overflow-y-auto pr-1 scrollable-grid"
              onScroll={handleRightScroll}
              onMouseEnter={() => (activeScrollerRef.current = "right")}
              onWheel={() => (activeScrollerRef.current = "right")}
            >
              <div className="grid grid-cols-2 gap-1.5 pb-4">
                {RIGHT_BLOCKS.map((b) => (
                  <ContentCard
                    key={b.id}
                    title={b.title}
                    variant="tall"
                    blockId={b.id}
                    pfp={b.pfp}
                    contentImage={b.contentImage}
                    hasHoverInfo={Boolean(hoverInfoMap[b.id])}
                    onHoverStart={(target) => {
                      const rect = target.getBoundingClientRect();
                      const wrapperRect =
                        wrapperRef.current?.getBoundingClientRect() ?? {
                          top: 0,
                        };
                      const triggerCenterY =
                        rect.top - wrapperRect.top + rect.height / 2;
                      setHoveredBlock({
                        id: b.id,
                        side: "right",
                        triggerCenterY,
                      });
                    }}
                    onHoverEnd={() => setHoveredBlock(null)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Phone>

        {/* LEFT panel: always on the outside of the left phone */}
        <SideInfo
          isOpen={Boolean(leftInfo)}
          side="left"
          title={leftInfo?.title ?? ""}
          text={leftInfo?.text ?? ""}
          triggerCenterY={
            hoverInfo?.side === "left" ? hoverInfo.triggerCenterY : undefined
          }
        />

        {/* RIGHT panel: always on the outside of the right phone */}
        <SideInfo
          isOpen={Boolean(rightInfo)}
          side="right"
          title={rightInfo?.title ?? ""}
          text={rightInfo?.text ?? ""}
          triggerCenterY={
            hoverInfo?.side === "right" ? hoverInfo.triggerCenterY : undefined
          }
        />
      </div>
    </div>
  );
}

/* ---------------- Observer hook ---------------- */

function useInfoBlocksInView({
  scrollRootRef,
  scrollInfoMap,
  onChange,
}: {
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  onChange: (blockIdOrNull: number | null) => void;
  scrollInfoMap: Record<number, ScrollInfo>;
}) {
  const lastVisibleIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const rootEl = scrollRootRef.current;
    if (!rootEl) return;

    const targets = Array.from(
      rootEl.querySelectorAll<HTMLElement>("[data-block-id]")
    ).filter((el) => {
      const id = Number(el.getAttribute("data-block-id"));
      return Boolean(scrollInfoMap[id]); // only blocks with info
    });

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleInfoBlocks = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            el: e.target as HTMLElement,
            ratio: e.intersectionRatio ?? 0,
          }))
          .sort((a, b) => b.ratio - a.ratio);

        if (visibleInfoBlocks.length === 0) {
          if (lastVisibleIdRef.current !== null) {
            lastVisibleIdRef.current = null;
            onChange(null);
          }
          return;
        }

        const top = visibleInfoBlocks[0];
        const id = Number(top.el.getAttribute("data-block-id"));
        if (!Number.isFinite(id)) return;

        if (lastVisibleIdRef.current !== id) {
          lastVisibleIdRef.current = id;
          onChange(id);
        }
      },
      { root: rootEl, threshold: [0.6] }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [scrollRootRef, onChange, scrollInfoMap]);
}

/* ---------------- Phone wrapper ---------------- */

function Phone({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[700px] w-[360px] overflow-hidden">
      <Android className="block h-full w-full">{children}</Android>
    </div>
  );
}

/* ---------------- SideInfo (no flicker, fade in/out) ---------------- */

function SideInfo({
  isOpen,
  side,
  title,
  text,
  triggerCenterY,
}: {
  isOpen: boolean;
  side: Side;
  title: string;
  text: string;
  triggerCenterY?: number;
}) {
  // Keep mounted during fade-out and freeze content so it doesn't flash blank
  const [mounted, setMounted] = React.useState(false);
  const [frozen, setFrozen] = React.useState({ side, title, text });

  React.useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setFrozen({ side, title, text });
    }
  }, [isOpen, side, title, text]);

  if (!mounted) return null;

  const base =
    "absolute w-72 rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur shadow-lg p-4 text-neutral-900 " +
    "transition-all duration-200 ease-out";

  const verticalPosition =
    triggerCenterY === undefined
      ? "top-1/2 -translate-y-1/2"
      : "-translate-y-1/2";

  const position =
    frozen.side === "left"
      ? "right-[calc(100%+16px)]"
      : "left-[calc(100%+16px)]";

  const openState = "opacity-100 translate-x-0 pointer-events-auto";
  const closedState =
    frozen.side === "left"
      ? "opacity-0 translate-x-2 pointer-events-none"
      : "opacity-0 -translate-x-2 pointer-events-none";

  return (
    <div
      style={triggerCenterY !== undefined ? { top: `${triggerCenterY}px` } : {}}
      className={`${base} ${position} ${verticalPosition} ${
        isOpen ? openState : closedState
      }`}
      onTransitionEnd={(e) => {
        if (e.propertyName === "opacity" && !isOpen) setMounted(false);
      }}
    >
      <div className="text-sm font-semibold">{frozen.title}</div>
      <div className="mt-2 text-sm text-neutral-700 leading-relaxed">
        {frozen.text}
      </div>
    </div>
  );
}
