// follow.api.ts (o como lo llames)
export async function checkIfFollowing(followerId: string, followingId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follows/${followerId}/${followingId}`);
    if (!res.ok) throw new Error("Error checking follow status");
    return res.json(); // { isFollowing: boolean }
  }
  
  export async function followUser({ followerId, followingId }: { followerId: string; followingId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId, followingId }),
    });
    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Error al seguir al usuario");
    }
    return res.json(); 
  }
  
  export async function unfollowUser({ followerId, followingId }: { followerId: string; followingId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follows`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId, followingId }),
    });
    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Error al dejar de seguir al usuario");
    }
    return res.json();
  }
  

  export async function getFollowers(userId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follows/${userId}/followers`);
    if (!res.ok) throw new Error("Error fetching followers count");
    return res.json(); 
  }
  
  export async function getFollowing(userId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follows/${userId}/following`);
    if (!res.ok) throw new Error("Error fetching following count");
    return res.json();
  }