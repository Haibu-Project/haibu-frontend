import { User } from '../types/user';
export async function fetchUsers() {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users');
    if (!response.ok) {
      throw new Error('Error obtaining users');
    }
    return response.json();
  }

export async function fetchUserByUsername(username: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/users/username/${username}`);
    if (!response.ok) {
      throw new Error('Error obtaining');
    }
    return response.json();
  }

export async function updateUserProfile(id:string, user: Partial<User>) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Error updating');
    }
    return response.json();
}