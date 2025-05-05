import express, {Request, Response}  from 'express';
import Database from 'better-sqlite3' //Libreria necesaria para usar SQLite

const app = express()
app.use(express.json())

//Establecemos el puerto
const PORT = 3000

//Crear la base de datos
const db = new Database('Citas-Medicas.db')


//Endpoint de tipo get para mostrar los datos.
app.get('/pacientes', (_req, res)=> {
//Recuperamos los datos de la tabla pacientes
  const ObtenerTodos = db.prepare('SELECT * from pacientes')
  const ListaCitas = ObtenerTodos.all()
  //Mostramos los datos
  res.send(ListaCitas)
})


//Endpoint de tipo post que ingresa nuevos registros a la base de datos
app.post('/pacientes/add', (req: Request, res: Response) => {
  const {patientName, doctorName, appoinmentDate, reason, status} = req.body

  //Comprobar datos inexistentes
  if(!patientName || !doctorName || !appoinmentDate){
    return res.status(400).json({error: 'Datos inválidos'});
  }


  try {
    const stmt = db.prepare('INSERT INTO pacientes (patientName, doctorName, appoinmentDate, reason, status) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(patientName, doctorName, appoinmentDate, reason, status);

    return res.status(201).json({ id: result.lastInsertRowid, patientName, doctorName, appoinmentDate, reason, status });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al insertar el paciente' });
  }

})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
