import type { NextFC } from "next";

import Blog from "components/Blog";
import NotFoundPage from "components/NotFoundPage";
import { useHotReload } from "hooks/useHotReload";

export interface BlogProps {
  blog: string | null;
}

const getBlog = (): Promise<string | null> =>
  import("../../blogs/index.md").then((mod) => mod.default).catch(() => null);

const BlogPage: NextFC<BlogProps> = ({ blog: propBlog }) => {
  const blog = useHotReload("", propBlog, getBlog);
  if (blog === null) {
    return <NotFoundPage />;
  }

  return <Blog>{blog}</Blog>;
};

BlogPage.getInitialProps = async () => {
  const blog = await getBlog();

  return { blog };
};

export default BlogPage;
