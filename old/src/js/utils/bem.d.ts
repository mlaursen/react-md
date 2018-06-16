interface Modifiers {
  [key: string]: boolean;
}

export default function bem(block: string, ...elements: Array<string | Modifiers>): string;
