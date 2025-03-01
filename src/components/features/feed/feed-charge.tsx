import FeedClient from "./feed";
import { fetchPosts } from "@/api/post-oracle.api";

export default async function FeedServer() {
  try {
    const posts = await fetchPosts();
    return <FeedClient initialPosts={posts} />;  // ✅ Change 'posts' to 'initialPosts'
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}
