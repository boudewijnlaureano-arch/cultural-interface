export interface ScrollInfo {
  id: number;
  title: string;
  text: string;
}

export function ScrollInfoBlock(props: ScrollInfo) {
  // This component is used for its props, it does not render anything.
  return null;
}
