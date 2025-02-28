import { Oracle } from "@chopinframework/next";
export async function createPost(data: { content: string; userId?: string }) {
    try {
      const response = await Oracle.fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response)
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || "Error al crear post");
      }
      const result = await response.json();
      console.log(result)
      return result;
    } catch (error) {
      console.error("Error en createPost:", error);
      throw error;
    }
  }

  export async function fetchPosts() {
    const response = await Oracle.fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
    if (!response.ok) {
      throw new Error("Error fetching posts")
    }
    console.log("with chopin")
    return response.json()
  }
  export async function fetchPost(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`)
    if (!response.ok) {
      throw new Error("Error fetching post")
    }
    return response.json()
  }  
  