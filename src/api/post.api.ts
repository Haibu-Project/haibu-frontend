export async function createPost(data: { content: string; userId?: string }) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
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
  