import * as React from "react"
import { Android } from "./components/ui/shadcn-io/android"

export default function App() {
  return (
    <div className="flex justify-center gap-8 p-8">
      <Phone>
        <div className="h-full flex flex-col p-4 gap-3 text-neutral-900">
          <h2 className="text-lg font-semibold text-center">App Menu</h2>

          {/* scrollable grid */}
          <div className="flex-1 overflow-y-auto scrollable-grid pr-1">
            <div className="grid grid-cols-2 gap-3 pb-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <InfoCard
                  key={i}
                  title={`Block ${i + 1}`}
                  infoText={`Placeholder for block ${i + 1}.`}
                />
              ))}
            </div>
          </div>
        </div>
      </Phone>

      <Phone>
        <div className="p-4 flex items-center justify-center h-full text-neutral-700">
          <span className="text-sm opacity-70"></span>
        </div>
      </Phone>
    </div>
  )
}

type PhoneProps = React.PropsWithChildren<{}>

function Phone({ children }: PhoneProps) {
  return (
    <div className="relative h-[700px] w-[360px]">
      <Android className="h-full w-full pointer-events-none" />

      {/* keep this transparent so the SVG grey shows through */}
      <div
        className="
          absolute
          left-[2.08%] top-[1.59%]
          w-[83.14%] h-[90.70%]
          rounded-[25px] overflow-hidden
          bg-transparent
        "
      >
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  )
}

type InfoCardProps = {
  title: string
  infoText: string
}

function InfoCard({ title, infoText }: InfoCardProps) {
  return (
    <div
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

      {/* “i” badge */}
      <button
        type="button"
        className="
          absolute top-1.5 right-1.5
          h-5 px-1.5
          rounded-full
          border border-neutral-300
          bg-neutral-100/90
          text-[10px] leading-[14px]
          text-neutral-700
          flex items-center justify-center
        "
      >
        i
      </button>

      {/* hover tooltip */}
      <div
        className="
          pointer-events-none
          absolute right-2 top-7 z-10
          w-40 rounded-md
          bg-neutral-900/90
          px-2 py-1
          text-[11px] text-neutral-50
          opacity-0 translate-y-1
          group-hover:opacity-100 group-hover:translate-y-0
          transition-opacity transition-transform duration-150 ease-out
        "
      >
        {infoText}
      </div>
    </div>
  )
}
