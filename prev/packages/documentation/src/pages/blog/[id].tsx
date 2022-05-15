import type { NextFC } from "next";

import { MarkdownPage } from "components/Markdown";
import NotFoundPage from "components/NotFoundPage";
import { useHotReload } from "hooks/useHotReload";
import { qsToString } from "utils/routes";

export interface BlogProps {
  blogId: string;
  blog: string | null;
}

const getBlog = (blogId: string): Promise<string | null> =>
  import(`../../blogs/${blogId}.md`)
    .then((mod) => mod.default)
    .catch(() => null);

const Blog: NextFC<BlogProps> = ({ blog: propBlog, blogId }) => {
  const blog = useHotReload(blogId, propBlog, getBlog);

  if (blog === null) {
    return <NotFoundPage />;
  }

  return <MarkdownPage>{blog}</MarkdownPage>;
};

Blog.getInitialProps = async ({ query }): Promise<BlogProps> => {
  const blogId = qsToString(query.id);
  const blog = await getBlog(blogId);

  return { blogId, blog };
};

export default Blog;
