import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { PostTitle } from "components/ui/PostTitle";
import { PostBody } from "components/ui/PostBody";
import { PostHeader } from "components/ui/PostHeader";
import { getPostBySlug, getAllPosts } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";

type Props = {
  post: any;
  morePosts: any;
  preview?: boolean;
};

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | Next.js Blog Example with</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
  locale: string;
};
/*  */
export async function getStaticProps({ params, locale }: Params) {
  const post = getPostBySlug(
    params.slug,
    "works",
    ["title", "date", "slug", "author", "content", "ogImage", "coverImage"],
    locale
  );
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths({ locales }) {
  const posts = getAllPosts("works", ["slug"]);

  const paths = locales.reduce(
    (acc, curr) => [
      ...acc,
      ...posts.map((post) => ({
        params: {
          slug: post.slug,
        },
        locale: curr,
      })),
    ],
    []
  );

  return {
    paths: paths,
    fallback: false,
  };
}
