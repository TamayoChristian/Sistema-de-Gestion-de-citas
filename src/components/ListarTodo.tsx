import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Item = {
  id: number;
  patientName: string;
};

const ListarTodo: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Item[]>('http://localhost:3000/appointments')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los datos');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.patientName}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ListarTodo;