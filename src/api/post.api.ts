export async function createPost(data: { content: string; userId?: string, title: string}) {
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

export async function fetchPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
  if (!response.ok) {
    throw new Error("Error fetching posts")
  }
  console.log(response)
  return response.json()
}


export async function fetchPostsByUserId(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/user/${id}`)
  if (!response.ok) {
    throw new Error("Error fetching post")
  }
  return response.json()
}

export async function deletePost(postId: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`, {
      method: "DELETE"
  });
}


export async function fetchPost(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`)
  if (!response.ok) {
    throw new Error("Error fetching post")
  }
  return response.json()
}

export async function likePost(userId: string, postId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, postId })
  });
  return response.json();
}

export async function getPostLikes(postId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes/${postId}`);
  const result = await response.json();
  return result.likes;
}

export async function unlikePost(userId: string, postId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, postId })
  });
  response.json();
}


export async function fetchComments(postId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}`);
  return response.json();
}

export async function addComment(content: string, userId: string, postId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, userId, postId })
  });
  return response.json();
}

export async function deleteComment(commentId: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`, {
      method: "DELETE"
  });
}

export async function getUserLikeOnPost(userId: string, postId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes/${userId}/${postId}`);

  if (!response.ok) {
    throw new Error("Error checking user like status");
  }

  const result = await response.json();
  return result.liked; 
}


