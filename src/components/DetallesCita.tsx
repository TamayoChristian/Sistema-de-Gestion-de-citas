import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Item = {
  id: number;
  patientName: string;
  doctorName: string;
  appoinmentDate: string;
  reason: string;
  status: string;
  createdAt: string;
};

const DetallesCita: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [inputId, setInputId] = useState('');
  const [cita, setCita] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Item[]>('http://localhost:3000/appointments')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(() => {
        setMensaje('Error al cargar las citas');
        setLoading(false);
      });
  }, []);

  const buscarCita = () => {
    const idBuscado = parseInt(inputId);
    if (isNaN(idBuscado)) {
      setMensaje('Ingresa un ID válido');
      setCita(null);
      return;
    }

    const encontrada = items.find(item => item.id === idBuscado);

    if (encontrada) {
      setCita(encontrada);
      setMensaje(null);
    } else {
      setCita(null);
      setMensaje('No se encontró la cita con ese ID');
    }
  };

  const BorrarCita = async(id:number) => {
    try {
        await fetch(`http://localhost:3000/appointments/${id}`, {
            method: "Delete",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
       // Actualizar el estado local eliminando la cita borrada
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      if(cita?.id === id){
        setCita(null);
      }
      setMensaje('Cita borrada')
    } catch (error) {
        setMensaje('Error al borrar la cita')
        console.error(error);
    }
  }

  return (
    <div>
      <h2>Buscar cita por ID</h2>
      <input
        type="number"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        placeholder="Ingresa el ID"
      />
      <button onClick={buscarCita}>Buscar</button>

      {loading && <p>Cargando citas...</p>}
      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}

      {cita && (
        <div>
          <h3>Detalles de la cita:</h3>
          <p><strong>ID:</strong> {cita.id}</p>
          <p><strong>Paciente:</strong> {cita.patientName}</p>
          <p><strong>Doctor:</strong> {cita.doctorName}</p>
          <p><strong>Fecha:</strong> {new Date(cita.appoinmentDate).toLocaleString()}</p>
          <p><strong>Razón:</strong> {cita.reason}</p>
          <p><strong>Estado:</strong> {cita.status}</p>
          <p><strong>Fecha de ingreso:</strong> {new Date(cita.createdAt).toLocaleString()}</p>
          <button onClick={()=> BorrarCita(cita.id)}>Borrar</button>
        </div>
      )}
    </div>
  );
};

export default DetallesCita;
