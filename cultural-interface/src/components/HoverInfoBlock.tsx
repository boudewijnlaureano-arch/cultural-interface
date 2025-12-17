export type HoverInfo = { id: number; title: string; text: string };

export function HoverInfoBlock(props: HoverInfo) {
  // This component only serves to hold data and does not render anything.
  // Its props are extracted by the parent component.
  return null;
}
