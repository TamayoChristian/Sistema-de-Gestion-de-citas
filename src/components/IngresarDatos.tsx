import React, { use, useState } from "react"
import "../styles/Ingreso.css"

const IngresarDatos = () => {
    const [patientName, setPatientName] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [appoinmentDate, setAppoinmentDate] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    

    const SubidaDatos = async (e) => {
        e.preventDefault();

        const arrayDatos = new FormData();
        arrayDatos.append("patientName", patientName);
        arrayDatos.append("doctorName", doctorName);
        arrayDatos.append("appoinmentDate", appoinmentDate);
        arrayDatos.append("reason", reason);
        arrayDatos.append("status", status);



        try {
            const response = await fetch("http://localhost:3000/appointments", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    patientName,
                    doctorName,
                    appoinmentDate,
                    reason,
                    status
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })


            if (response.ok) {
                setMessage("Ingreso Exitoso");
            } else {
                setMessage("Error al subir")
            }

        } catch (error) {
            setMessage(`Error: ${error.message}`)
        }
    }

    return (
        <form onSubmit={SubidaDatos} className="formulario">
            <div>
                <label className="texto">Nombre del paciente: </label>
                <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required  className="inputs"/>
            </div>
            <div>
                <label className="texto">Nombre del médico: </label>
                <input style={{marginLeft: "3%"}} type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required className="inputs"/>
            </div>
            <div>
                <label>Fecha de la cita: </label>
                <input style={{marginLeft: "6.5%"}} type="datetime-local" value={appoinmentDate} onChange={(e) => setAppoinmentDate(e.target.value)} required  className="inputs"/>
            </div>
            <div>
                <label>Razón: </label>
                <input style={{marginLeft: "15%"}} type="text" value={reason} onChange={(e) => setReason(e.target.value)} required className="inputs"/>
            </div>
            <div>
                <label>Estado: </label>
                <select style={{marginLeft: "14.5%"}} value={status} onChange={(e) => setStatus(e.target.value)} required className="inputs">
                    <option value="">Selecciona un estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                </select>
            </div>
            <div className="centrarIngreso">
                <button type="submit" className="botonIngreso"> INGRESAR CITA</button>
            </div>
            {message && <p style={{color: message.toLocaleUpperCase().includes('error')? 'red': 'green'}}>{message}</p>}
        </form>
    )
}

export default IngresarDatos;