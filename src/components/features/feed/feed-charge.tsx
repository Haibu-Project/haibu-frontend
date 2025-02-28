import FeedClient from "./feed";
import { fetchPosts } from "@/api/post-oracle.api";

export default async function FeedServer() {
  try {
    const posts = await fetchPosts();
    return <FeedClient posts={posts} />;
  } catch (error) {
    return <p>Error al cargar posts</p>;
  }
}
