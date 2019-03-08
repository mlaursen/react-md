import * as marked from "marked";
import { MarkdownComponentJSON, ComponentTypes, IHeadingJSON } from "./types.d";

const stringify = (json: MarkdownComponentJSON) => {
  return JSON.stringify(json);
};

export const componentRenderer = new marked.Renderer();
componentRenderer.code = (code, language, escaped) =>
  stringify({ code, language, escaped, type: ComponentTypes.CodeBlock });

componentRenderer.blockquote = quote =>
  stringify({ type: ComponentTypes.Blockquote, quote });

componentRenderer.html = html => stringify({ type: ComponentTypes.HTML, html });

componentRenderer.heading = (text, level, raw, slugger) =>
  stringify({
    type: ComponentTypes.Heading,
    id: slugger.slug(text),
    text,
    level,
  });

componentRenderer.hr = () => stringify({ type: ComponentTypes.Divider });

componentRenderer.list = (body, ordered, start) =>
  stringify({ type: ComponentTypes.List, body, ordered, start });

componentRenderer.listitem = text =>
  stringify({ type: ComponentTypes.ListItem, text });

// componentRenderer.checkbox = (checked)
componentRenderer.paragraph = text =>
  stringify({ type: ComponentTypes.Paragraph, text });
componentRenderer.strong = text =>
  stringify({ type: ComponentTypes.Strong, text });
componentRenderer.em = text => stringify({ type: ComponentTypes.Em, text });
componentRenderer.codespan = code =>
  stringify({ type: ComponentTypes.Code, code });
componentRenderer.br = () => stringify({ type: ComponentTypes.Br });
componentRenderer.del = text => stringify({ type: ComponentTypes.Del, text });
componentRenderer.link = (href, title, text) =>
  stringify({ type: ComponentTypes.Link, href, title, text });
componentRenderer.image = (href, title, text) =>
  stringify({ type: ComponentTypes.Image, href, title, text });
componentRenderer.text = text => text;
