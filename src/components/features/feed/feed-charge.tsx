import FeedClient from "./feed";
import { fetchPosts } from "@/api/post-oracle.api";

export default async function FeedServer() {
  try {
    const posts = await fetchPosts();
    console.log(posts)
    return <FeedClient initialPosts={posts} />;  
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}
