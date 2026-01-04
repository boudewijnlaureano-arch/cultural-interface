import * as React from "react";
import { Android } from "./components/ui/shadcn-io/android/android";
import { ScrollInfoBlock, type ScrollInfo } from "./components/ScrollInfoBlock";
import { HoverInfoBlock, type HoverInfo } from "./components/HoverInfoBlock";
import { ContentCard } from "./components/ContentCard";
import { NavBar } from "./components/NavBar";
import { StatusBar } from "./components/StatusBar";
import { SearchBar } from "./components/SearchBar";
import { CategoryTabs } from "./components/CategoryTabs";
import { PromoBanner } from "./components/PromoBanner";
import { QuickActions } from "./components/QuickActions";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { CONCEPT_HOVER_INFO, HOVER_INFO_DATA } from "./hoverInfo";



type Side = "left" | "right";

const BADGES: Array<"HOT" | "NEW" | "SALE" | null> = ["HOT", "NEW", null, "SALE", null, "HOT", null, "NEW"];
const LIKES = [2300, 1800, 3100, 956, 1500, 2700, 890, 1200];
const PRICES = ["¥199", "¥89", "¥599", "¥299", "¥149", "¥399", "¥79", "¥249"];

const RIGHT_BLOCKS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 8,
  title: `Block ${i + 8}`,
  pfp: { label: "@Yuan ShiMing", src: '/assets/PFPs/kipepeopfp.jpeg' },
  contentImage: { label: "toronto", src: '/assets/Content/toronto.jpeg'},
  badge: BADGES[i],
  likes: LIKES[i],
  price: PRICES[i],
}));

const LEFT_BLOCKS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1, // 6..10
  title: `Block ${i + 1}`,
  pfp: { label: "@John Smith", src: "/assets/PFPs/kipepeopfp.jpeg" },
  contentImage: { label: "toronto", src: "/assets/Content/toronto.jpeg" },
}));

export default function App() {
  const [scrollInfoMap] = React.useState<Record<number, ScrollInfo>>({});
  const [hoverInfoMap] =
    React.useState<Record<string | number, HoverInfo | HoverInfo[]>>(
      HOVER_INFO_DATA
    );
  const [clickedBlock, setClickedBlock] = React.useState<{
    id: number;
    side: Side;
    triggerCenterY: number;
  } | null>(null);

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const leftScrollRef = React.useRef<HTMLDivElement | null>(null);
  const rightScrollRef = React.useRef<HTMLDivElement | null>(null);

  // tracks active scroller to prevent sync loop
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

  const handleCardClick = (
    target: HTMLElement,
    blockId: number,
    side: Side
  ) => {
    const rect = target.getBoundingClientRect();
    const wrapperRect = wrapperRef.current?.getBoundingClientRect() ?? {
      top: 0,
    };
    const triggerCenterY = rect.top - wrapperRect.top + rect.height / 2;
    setClickedBlock({ id: blockId, side, triggerCenterY });
  };

  const handleCardLeave = () => {
    setClickedBlock(null);
  };

  let leftInfo: (HoverInfo & { triggerCenterY: number }) | undefined;
  let rightInfo: (HoverInfo & { triggerCenterY: number }) | undefined;

  const getHoverInfo = (id: string | number) => {
    return hoverInfoMap[id] ?? CONCEPT_HOVER_INFO[id];
  };

  const displayBlock = clickedBlock;

  if (displayBlock) {
    const infoData = getHoverInfo(displayBlock.id);
    if (Array.isArray(infoData)) {
      // [0] = american, [1] = chinese
      const info = displayBlock.side === "left" ? infoData[0] : infoData[1];
      const infoWithTrigger = {
        ...info,
        triggerCenterY: displayBlock.triggerCenterY,
      };
      if (displayBlock.side === "left") {
        leftInfo = infoWithTrigger;
      } else {
        rightInfo = infoWithTrigger;
      }
    } else if (infoData) {
      const infoWithTrigger = {
        ...infoData,
        triggerCenterY: displayBlock.triggerCenterY,
      };
      if (displayBlock.side === "left") {
        leftInfo = infoWithTrigger;
      } else {
        rightInfo = infoWithTrigger;
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-600">
      <div ref={wrapperRef} className="relative flex">
        {/* left phone */}
        <Phone>
          <div className="h-full flex flex-col pt-2 text-neutral-900 bg-blue-100">
            <StatusBar variant="left" />
            <SearchBar variant="left" />

            {/* content area */}
            <div className="flex-1 min-h-0 p-4">
              <div
                ref={leftScrollRef}
                className="h-full overflow-y-auto pr-1 scrollable-grid"
                onScroll={handleLeftScroll}
                onMouseEnter={() => (activeScrollerRef.current = "left")}
                onWheel={() => (activeScrollerRef.current = "left")}
              >
                <div className="grid grid-cols-1 gap-3 pb-4">
                  {LEFT_BLOCKS.map((b) => {
                    const hasCardHover = Boolean(getHoverInfo(b.id));
                    return (
                      <ContentCard
                        key={b.id}
                        title={b.title}
                        variant="square"
                        blockId={b.id}
                        pfp={b.pfp}
                        contentImage={b.contentImage}
                        gradientColor="blue"
                        hasHoverInfo={hasCardHover}
                        onHoverStart={() => {}} // No-op - chip shows on hover, panel on click
                        onHoverEnd={handleCardLeave}
                        onPfpClick={(target) =>
                          handleCardClick(target, 4, "left")
                        }
                        onCardClick={(target) =>
                          handleCardClick(target, hasCardHover ? b.id : 3, "left")
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <NavBar
              variant="left"
              onButtonClick={(target, iconName) => {
                if (iconName === "play") {
                  handleCardClick(target, 6, "left");
                }
              }}
              onButtonLeave={handleCardLeave}
            />
          </div>
        </Phone>

        {/* right phone */}
        <Phone>
          <div className="h-full flex flex-col pt-2 text-neutral-900 bg-red-100">
            <StatusBar variant="right" />
            <SearchBar variant="right" />
            <CategoryTabs />

            {/* content area */}
            <div className="flex-1 min-h-0">
              <div
                ref={rightScrollRef}
                className="h-full overflow-y-auto pr-1 scrollable-grid"
                onScroll={handleRightScroll}
                onMouseEnter={() => (activeScrollerRef.current = "right")}
                onWheel={() => (activeScrollerRef.current = "right")}
              >
                <PromoBanner />
                <QuickActions />
                <AnnouncementBar />

                <div className="grid grid-cols-2 gap-1.5 px-2 pb-4">
                  {RIGHT_BLOCKS.map((b) => {
                    const hasCardHover = Boolean(getHoverInfo(b.id));
                    return (
                      <ContentCard
                        key={b.id}
                        title={b.title}
                        variant="tall"
                        blockId={b.id}
                        pfp={b.pfp}
                        contentImage={b.contentImage}
                        badge={b.badge}
                        likes={b.likes}
                        price={b.price}
                        gradientColor="rose"
                        hasHoverInfo={hasCardHover}
                        onHoverStart={() => {}} // No-op - chip shows on hover, panel on click
                        onHoverEnd={handleCardLeave}
                        onPfpClick={(target) =>
                          handleCardClick(target, 4, "right")
                        }
                        onCardClick={(target) =>
                          handleCardClick(target, hasCardHover ? b.id : 3, "right")
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <NavBar
              variant="right"
              onButtonClick={(target, iconName) => {
                if (iconName === "hot") {
                  handleCardClick(target, 6, "right");
                }
              }}
              onButtonLeave={handleCardLeave}
            />
          </div>
        </Phone>

        {/* info panels */}
        <SideInfo
          isOpen={Boolean(leftInfo)}
          side="left"
          title={leftInfo?.title ?? ""}
          text={leftInfo?.text ?? ""}
          triggerCenterY={leftInfo?.triggerCenterY}
        />
        <SideInfo
          isOpen={Boolean(rightInfo)}
          side="right"
          title={rightInfo?.title ?? ""}
          text={rightInfo?.text ?? ""}
          triggerCenterY={rightInfo?.triggerCenterY}
        />
      </div>
    </div>
  );
}

/* observer hook */

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
      return Boolean(scrollInfoMap[id]);
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

/* phone wrapper */

function Phone({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[700px] w-[360px]">
      <Android className="block h-full w-full">{children}</Android>
    </div>
  );
}

/* side info panel */

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
  // freeze content during fade-out
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
