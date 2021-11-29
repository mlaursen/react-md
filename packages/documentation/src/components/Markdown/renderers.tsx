import {
  DEFAULT_MARKDOWN_RENDERERS,
  getTokensText,
  ImageRenderer,
  MarkdownRenderers,
  useSluggedId,
} from "react-marked-renderer";
import {
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  Typography,
} from "react-md";

import Blockquote from "components/Blockquote";
import Code from "components/Code";
import CodeBlock from "components/CodeBlock";
import Link from "components/Link";

import styles from "./renderers.module.scss";

export const renderers: MarkdownRenderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,
  hr: function Hr() {
    return <Divider />;
  },

  link: function LinkRenderer({
    type: _type,
    raw: _raw,
    text: _text,
    tokens: _tokens,
    ...props
  }) {
    return <Link {...props} />;
  },

  paragraph: function Paragraph({ children }) {
    return (
      <Typography type="subtitle-1" component="p">
        {children}
      </Typography>
    );
  },

  heading: function Heading({ depth, tokens, children }) {
    type Headline =
      | "headline-1"
      | "headline-2"
      | "headline-3"
      | "headline-4"
      | "headline-5"
      | "headline-6";

    let type: Headline;
    switch (depth) {
      case 1:
        type = "headline-1";
        break;
      case 2:
        type = "headline-2";
        break;
      case 3:
        type = "headline-3";
        break;
      case 4:
        type = "headline-4";
        break;
      case 5:
        type = "headline-5";
        break;
      default:
        type = "headline-6";
    }

    const id = useSluggedId(tokens);
    return (
      <Typography id={id} type={type}>
        {children}
      </Typography>
    );
  },

  codespan: function CodeSpan({ children }) {
    return <Code className="language-none">{children}</Code>;
  },

  codeblock: function Codeblock({ lang, text }) {
    return <CodeBlock language={lang}>{text}</CodeBlock>;
  },

  listitem: function ListItem({ children }) {
    return (
      <Typography component="li" type="subtitle-1">
        {children}
      </Typography>
    );
  },

  blockquote: function BlockquoteRenderer({ children }) {
    return <Blockquote>{children}</Blockquote>;
  },

  task: function Task({ defaultChecked, tokens, children }) {
    const id = useSluggedId(`${getTokensText(tokens)}-task`);
    // add a key so the state updates correctly if someone modifies the markdown
    // checked state instead of clicking the checkbox. Only useful if the
    // preview is persistent while updating the markdown.
    return (
      <li key={`${defaultChecked}`} className={styles.task}>
        <Checkbox id={id} defaultChecked={defaultChecked} label={children} />
      </li>
    );
  },

  img: function Img({ href, ...props }) {
    return (
      <Link
        href={href}
        className="rmd-media-container rmd-media-container--auto"
      >
        {href.endsWith(".mp4") ? (
          <video autoPlay loop muted controls>
            <source src={href} type="video/mp4" />
            {props.text || props.title}
          </video>
        ) : (
          <ImageRenderer href={href} {...props} />
        )}
      </Link>
    );
  },

  table: function TableRenderer({ children }) {
    return (
      <TableContainer>
        <Table>{children}</Table>
      </TableContainer>
    );
  },
  tbody: function Tbody({ children }) {
    return <TableBody>{children}</TableBody>;
  },
  thead: function Thead({ children }) {
    return <TableHeader>{children}</TableHeader>;
  },
  tr: function Tr({ children }) {
    return <TableRow>{children}</TableRow>;
  },
  td: function Td({ children }) {
    return <TableCell>{children}</TableCell>;
  },
  th: function Th({ children }) {
    return <TableCell>{children}</TableCell>;
  },
};
