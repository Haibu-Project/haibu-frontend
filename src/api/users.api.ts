export async function fetchUsers() {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users');
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    return response.json();
  }