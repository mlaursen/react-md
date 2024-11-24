import {
  CUSTOM_MDX_COMPONENTS,
  type CustomMDXComponents,
} from "@/components/CustomMdxComponents.jsx";
import { type MDXComponents } from "mdx/types.js";

export function useMDXComponents(
  components: MDXComponents
): CustomMDXComponents {
  return {
    ...components,
    ...CUSTOM_MDX_COMPONENTS,
  };
}
