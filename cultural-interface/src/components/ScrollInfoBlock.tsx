export type ScrollInfo = { id: number; title: string; text: string };

export function ScrollInfoBlock(props: ScrollInfo) {
  // This component only serves to hold data and does not render anything.
  // Its props are extracted by the parent component.
  return null;
}
