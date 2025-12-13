import * as React from "react";
import { Android } from "./components/ui/shadcn-io/android/android";

type Side = "left" | "right";

const RIGHT_BLOCKS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 6,
  title: `Block ${i + 6}`,
}));

const LEFT_BLOCKS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1, // 6..10
  title: `Block ${i + 1}`,
}));

const BLOCK_INFO: Record<number, { title: string; text: string } | undefined> = {
  5: {
    title: "Block 5",
    text: "Information about a Western design choice of this component",
  },
  8: {
    title: "Block 8",
    text: "Information about a Chinese design choice of this component",
  },
};

export default function App() {
  // independent “currently visible info block” per phone
  const [visible, setVisible] = React.useState<{ left: number | null; right: number | null }>({
    left: null,
    right: null,
  });

  const leftScrollRef = React.useRef<HTMLDivElement | null>(null);
  const rightScrollRef = React.useRef<HTMLDivElement | null>(null);

  useInfoBlocksInView({
    scrollRootRef: leftScrollRef,
    onChange: (blockIdOrNull) => setVisible((v) => ({ ...v, left: blockIdOrNull })),
  });

  useInfoBlocksInView({
    scrollRootRef: rightScrollRef,
    onChange: (blockIdOrNull) => setVisible((v) => ({ ...v, right: blockIdOrNull })),
  });

  const leftInfo = visible.left ? BLOCK_INFO[visible.left] : undefined;
  const rightInfo = visible.right ? BLOCK_INFO[visible.right] : undefined;

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {/* Wrapper MUST be relative so panels can position next to phones */}
      <div className="relative flex">
        {/* Left phone (shows blocks 6..10) */}
        <Phone>
          <div className="h-full flex flex-col p-4 gap-3 text-neutral-900">
            <div ref={leftScrollRef} className="flex-1 overflow-y-auto pr-1 scrollable-grid">
              <div className="grid grid-cols-1 gap-3 pb-4">
                {LEFT_BLOCKS.map((b) => (
                  <InfoCard key={b.id} title={b.title} blockId={b.id} />
                ))}
              </div>
            </div>
          </div>
        </Phone>

        {/* Right phone (shows blocks 1..5) */}
        <Phone>
          <div className="h-full flex flex-col p-4 gap-3 text-neutral-900">
            <div ref={rightScrollRef} className="flex-1 overflow-y-auto pr-1 scrollable-grid">
              <div className="grid grid-cols-1 gap-3 pb-4">
                {RIGHT_BLOCKS.map((b) => (
                  <InfoCard key={b.id} title={b.title} blockId={b.id} />
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
        />

        {/* RIGHT panel: always on the outside of the right phone */}
        <SideInfo
          isOpen={Boolean(rightInfo)}
          side="right"
          title={rightInfo?.title ?? ""}
          text={rightInfo?.text ?? ""}
        />
      </div>
    </div>
  );
}

/* ---------------- Observer hook ---------------- */

function useInfoBlocksInView({
  scrollRootRef,
  onChange,
}: {
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  onChange: (blockIdOrNull: number | null) => void;
}) {
  const lastVisibleIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const rootEl = scrollRootRef.current;
    if (!rootEl) return;

    const targets = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-block-id]")).filter(
      (el) => {
        const id = Number(el.getAttribute("data-block-id"));
        return Boolean(BLOCK_INFO[id]); // only blocks with info
      }
    );

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
  }, [scrollRootRef, onChange]);
}

/* ---------------- Phone wrapper ---------------- */

function Phone({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[700px] w-[360px] overflow-hidden">
      <Android className="block h-full w-full">{children}</Android>
    </div>
  );
}

/* ---------------- InfoCard ---------------- */

function InfoCard({ title, blockId }: { title: string; blockId: number }) {
  return (
    <div
      data-block-id={blockId}
      className="
        relative group aspect-square
        rounded-3xl
        bg-white/80
        border border-neutral-200
        shadow-sm
        flex items-center justify-center
        text-sm font-medium text-neutral-900
        backdrop-blur-sm
      "
    >
      {title}
    </div>
  );
}

/* ---------------- SideInfo (no flicker, fade in/out) ---------------- */

function SideInfo({
  isOpen,
  side,
  title,
  text,
}: {
  isOpen: boolean;
  side: Side;
  title: string;
  text: string;
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
    "absolute top-1/2 -translate-y-1/2 w-72 rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur shadow-lg p-4 text-neutral-900 " +
    "transition-all duration-200 ease-out";

  const position =
    frozen.side === "left" ? "right-[calc(100%+16px)]" : "left-[calc(100%+16px)]";

  const openState = "opacity-100 translate-x-0 pointer-events-auto";
  const closedState =
    frozen.side === "left"
      ? "opacity-0 translate-x-2 pointer-events-none"
      : "opacity-0 -translate-x-2 pointer-events-none";

  return (
    <div
      className={`${base} ${position} ${isOpen ? openState : closedState}`}
      onTransitionEnd={(e) => {
        if (e.propertyName === "opacity" && !isOpen) setMounted(false);
      }}
    >
      <div className="text-sm font-semibold">{frozen.title}</div>
      <div className="mt-2 text-sm text-neutral-700 leading-relaxed">{frozen.text}</div>
    </div>
  );
}
