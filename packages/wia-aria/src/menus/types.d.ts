export type ShowMenuRequestFunction = (
  isFirstElement: boolean,
  isKeyboard: boolean
) => void;

export type MenuElement = HTMLOListElement | HTMLUListElement;
export type MenuButtonElement = HTMLButtonElement | HTMLDivElement;

export type FakeFormChangeEventHandler = (
  nextChecked: boolean,
  event: React.MouseEvent<HTMLLIElement>
) => void;
