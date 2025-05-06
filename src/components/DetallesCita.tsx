import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/IngresarID.css"

type Item = {
  id: number;
  patientName: string;
  doctorName: string;
  appoinmentDate: string;
  reason: string;
  status: string;
  createdAt: string;
};

const estadosPosibles = ['pendiente', 'confirmada', 'cancelada'];

const DetallesCita: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [inputId, setInputId] = useState('');
  const [cita, setCita] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [actualizandoEstado, setActualizandoEstado] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState<string | null>(null);

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
      setNuevoEstado(null); // reset nuevoEstado al buscar otra cita
    } else {
      setCita(null);
      setMensaje('No se encontró la cita con ese ID');
      setNuevoEstado(null);
    }
  };

  const BorrarCita = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/appointments/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      if (cita?.id === id) {
        setCita(null);
      }
      setMensaje('Cita borrada');
    } catch (error) {
      setMensaje('Error al borrar la cita');
      console.error(error);
    }
  };

  const actualizarEstado = async () => {
    if (!cita || !nuevoEstado) return;
    setActualizandoEstado(true);
    setMensaje(null);

    try {
      const response = await fetch(`http://localhost:3000/appointments/${cita.id}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: nuevoEstado })
      });

      if (!response.ok) {
        // Intentar leer error si hay JSON
        let errorMsg = 'Error al actualizar el estado';
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          // No hay JSON en la respuesta
        }
        throw new Error(errorMsg);
      }

      // Actualizar estado localmente
      const updatedCita = { ...cita, status: nuevoEstado };
      setCita(updatedCita);

      setItems(prevItems =>
        prevItems.map(item => (item.id === cita.id ? updatedCita : item))
      );

      setMensaje('Estado actualizado correctamente');
      setNuevoEstado(null); // reset nuevoEstado tras actualizar
    } catch (error: any) {
      setMensaje(error.message || 'Error de actualización');
      console.error(error);
    } finally {
      setActualizandoEstado(false);
    }
  };

  return (
    <div>
      <div className='cajaIngresoId'>
      <h2>Buscar cita por ID</h2>
      <input
        type="number"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        placeholder="Ingresa el ID"
      />
      <button onClick={buscarCita}>Buscar</button>
      </div>

      {loading && <p>Cargando citas...</p>}
      {mensaje && <p style={{ color: mensaje.toLowerCase().includes('error') ? 'red' : 'green' }}>{mensaje}</p>}

      {cita && (
        <div>
          <h3>Detalles de la cita:</h3>
          <p><strong>ID:</strong> {cita.id}</p>
          <p><strong>Paciente:</strong> {cita.patientName}</p>
          <p><strong>Doctor:</strong> {cita.doctorName}</p>
          <p><strong>Fecha:</strong> {new Date(cita.appoinmentDate).toLocaleString()}</p>
          <p><strong>Razón:</strong> {cita.reason}</p>

          <p><strong>Estado:</strong>{' '}
            <select
              value={nuevoEstado ?? cita.status}
              onChange={(e) => setNuevoEstado(e.target.value)}
              disabled={actualizandoEstado}
            >
              {estadosPosibles.map(estado => (
                <option key={estado} value={estado}>
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </option>
              ))}
            </select>
          </p>

          {/* Mostrar botón solo si hay un cambio pendiente */}
          {nuevoEstado && nuevoEstado !== cita.status && (
            <button onClick={actualizarEstado} disabled={actualizandoEstado}>
              {actualizandoEstado ? 'Actualizando...' : 'Confirmar cambio de estado'}
            </button>
          )}

          <p><strong>Fecha de ingreso:</strong> {new Date(cita.createdAt).toLocaleString()}</p>
          <button onClick={() => BorrarCita(cita.id)}>Borrar</button>
        </div>
      )}
    </div>
  );
};

export default DetallesCita;
