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
  onButtonClick: (target: HTMLElement, iconName: string) => void;
  activeButton?: string; // Optional: which button is currently active (defaults to "home")
};

export function NavBar({
  variant,
  onButtonClick,
}: NavBarProps) {
  const icons = variant === "left" ? LEFT_ICONS : RIGHT_ICONS;

  // Check which icons have info (play for left, create for right)
  const hasInfo = (iconName: string) => {
    if (variant === "left") return iconName === "play";
    if (variant === "right") return iconName === "create";
    return false;
  };

  return (
    <div className="p-3">
      <div className="flex justify-around items-center bg-white/90 backdrop-blur-md rounded-3xl h-14 px-2 gap-1 shadow-lg">
        {icons.map((icon) => {
          const showInfo = hasInfo(icon.name);
          const buttonColorClasses = variant === "left"
            ? "hover:bg-slate-50"
            : "hover:bg-rose-50";

          return (
            <button
              key={icon.src}
              className={`p-2 flex-1 flex justify-center items-center rounded-2xl transition-all duration-200 focus:outline-none relative group ${buttonColorClasses} ${
                showInfo ? "cursor-pointer" : ""
              }`}
              onClick={(e) => {
                if (showInfo) {
                  onButtonClick(e.currentTarget, icon.name);
                }
              }}
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className={`h-7 w-7 transition-transform group-hover:scale-110 ${
                  variant === "right"
                    ? "filter brightness-0 saturate-100 invert-[19%] sepia-[82%] hue-rotate-[344deg] contrast-[98%]"
                    : ""
                }`}
              />
              {/* Info indicator dot - only show on icons with info */}
              {showInfo && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
