import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Item = {
  id: number;
  patientName: string;
  doctorName: string;
  appoinmentDate: Date;
  reason: string;
  status: string;
  createdAt: Date
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
      <table border={1} cellPadding={1} cellSpacing={0}>
      
      <thead>
          <tr>
            <th>ID Cita</th>
            <th>Nombre del Paciente</th>
            <th>Nombre del Doctor</th>
            <th>Fecha de la Cita</th>
            <th>Razón</th>
            <th>Estado</th>
            <th>Fecha de generación de la cita</th>
          </tr>
        </thead>
        <tbody>
      
        {items.map(item => (
          <tr key={item.id}>
            <td>
              {item.id}
            </td>
            <td>
              {item.patientName}
            </td>
            <td>
              {item.doctorName}
            </td>
            <td>
              {new Date(item.appoinmentDate).toLocaleString()}
            </td>
            <td>
              {item.reason}
            </td>
            <td>
              {item.status}
            </td>
            <td>
              {new Date(item.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}

      </tbody>
      </table>
    </div>
  )
}
export default ListarTodo;