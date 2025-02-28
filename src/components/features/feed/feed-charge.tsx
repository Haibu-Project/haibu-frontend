import FeedClient from "./feed";
import { fetchPosts } from "@/api/post-oracle.api copy";

export default async function FeedServer() {
  try {
    const posts = await fetchPosts();
    return <FeedClient posts={posts} />;
  } catch (error) {
    console.error("Error cargando posts:", error);
    return <p>Error al cargar posts</p>;
  }
}
