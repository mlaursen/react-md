export enum ComponentTypes {
  CodeBlock = "CodeBlock",
  Blockquote = "Blockquote",
  HTML = "HTML",
  Heading = "Heading",
  Divider = "Divider",
  List = "List",
  ListItem = "ListItem",
  Checkbox = "Checkbox",
  Paragraph = "Paragraph",
  Table = "Table",
  TableRow = "TableRow",
  TableCell = "TableCell",

  // inline types
  Strong = "Strong",
  Em = "Em",
  Code = "Code",
  Br = "Br",
  Del = "Del",
  Link = "Link",
  Image = "Image",
  Text = "Text",
}

export interface ICodeBlockJSON {
  type: ComponentTypes.CodeBlock;
  code: string;
  language: string;
  escaped?: boolean;
}

export interface IBlockquoteJSON {
  type: ComponentTypes.Blockquote;
  quote: string;
}

export interface IHTMLJSON {
  type: ComponentTypes.HTML;
  html: string;
}

export interface IHeadingJSON {
  type: ComponentTypes.Heading;
  id: string;
  text: string;
  level: number;
}

export interface IDividerJSON {
  type: ComponentTypes.Divider;
}

export interface IListJSON {
  type: ComponentTypes.List;
  body: string;
  ordered: boolean;
  start: number;
}

export interface IListItemJSON {
  type: ComponentTypes.ListItem;
  text: string;
}

export interface ICheckboxJSON {
  type: ComponentTypes.Checkbox;
  checked: boolean;
}

export interface IParagraphJSON {
  type: ComponentTypes.Paragraph;
  text: string;
}

export interface ITableJSON {
  type: ComponentTypes.Table;
  header: string;
  body: string;
}

export interface ITableRowJSON {
  type: ComponentTypes.TableRow;
  content: string;
}

export interface ITableCellJSON {
  type: ComponentTypes.TableCell;
  content: string;
}

export interface IStrongJSON {
  type: ComponentTypes.Strong;
  text: string;
}

export interface IEmJSON {
  type: ComponentTypes.Em;
  text: string;
}

export interface ICodeJSON {
  type: ComponentTypes.Code;
  code: string;
}

export interface IBrJSON {
  type: ComponentTypes.Br;
}

export interface IDelJSON {
  type: ComponentTypes.Del;
  text: string;
}

export interface ILinkJSON {
  type: ComponentTypes.Link;
  href: string;
  title?: string;
  text: string;
}

export interface IImageJSON {
  type: ComponentTypes.Image;
  href: string;
  title?: string;
  text: string;
}

export interface ITextJSON {
  type: ComponentTypes.Text;
  text: string;
}

export type MarkdownComponentJSON =
  | ICodeBlockJSON
  | IBlockquoteJSON
  | IHTMLJSON
  | IHeadingJSON
  | IDividerJSON
  | IListJSON
  | IListItemJSON
  | ICheckboxJSON
  | IParagraphJSON
  | ITableJSON
  | ITableRowJSON
  | ITableCellJSON
  | IStrongJSON
  | IEmJSON
  | ICodeJSON
  | IBrJSON
  | IDelJSON
  | ILinkJSON
  | IImageJSON
  | ITextJSON;
