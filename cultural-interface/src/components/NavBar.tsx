import * as React from "react";

const LEFT_ICONS = [
  { name: "home", src: "/assets/icons/icon-home.svg", alt: "Home" },
  { name: "play", src: "/assets/icons/icon-play.svg", alt: "Play" },
  { name: "search", src: "/assets/icons/icon-search.svg", alt: "Search" },
  { name: "user", src: "/assets/icons/icon-user.svg", alt: "User" },
];

const RIGHT_ICONS = [
  { name: "home", src: "/assets/icons/icon-home.svg", alt: "Home" },
  { name: "shop", src: "/assets/icons/icon-shop.svg", alt: "Shop" },
  { name: "create", src: "/assets/icons/icon-create.svg", alt: "Create" },
  { name: "inbox", src: "/assets/icons/icon-inbox.svg", alt: "Inbox" },
  { name: "user", src: "/assets/icons/icon-user.svg", alt: "User" },
];

type NavBarProps = {
  variant: "left" | "right";
  onHoverStart: (target: HTMLElement) => void;
  onHoverEnd: () => void;
  onButtonHoverStart: (target: HTMLElement, iconName: string) => void;
  onButtonHoverEnd: () => void;
};

export function NavBar({
  variant,
  onHoverStart,
  onHoverEnd,
  onButtonHoverStart,
  onButtonHoverEnd,
}: NavBarProps) {
  const icons = variant === "left" ? LEFT_ICONS : RIGHT_ICONS;

  return (
    <div
      className="flex justify-around items-center backdrop-blur-sm border-t border-neutral-200 h-14 px-2"
      onMouseEnter={(e) => onHoverStart(e.currentTarget)}
      onMouseLeave={onHoverEnd}
    >
      {icons.map((icon) => (
        <button
          key={icon.src}
          className="p-2 flex-1 flex justify-center items-center rounded-lg bg-white hover:opacity-75 transition-opacity"
          onMouseEnter={(e) => onButtonHoverStart(e.currentTarget, icon.name)}
          onMouseLeave={onButtonHoverEnd}
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className={`h-8 w-8 ${
              variant === "right"
                ? "filter brightness-0 saturate-100 invert-[19%] sepia-[82%] hue-rotate-[344deg] contrast-[98%]"
                : ""
            }`}
          />
        </button>
      ))}
    </div>
  );
}
