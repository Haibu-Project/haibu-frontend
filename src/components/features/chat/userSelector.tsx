// components/UserSelector.js
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../../api/users.api';

export function UserSelector({ onSelect:any }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <select onChange={(e) => onselect(e.target.value)}>
      <option value="">Selecciona un usuario</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
