import express, {Request, Response}  from 'express';
import Database from 'better-sqlite3' //Libreria necesaria para usar SQLite
import { body, validationResult } from 'express-validator';


const app = express()
app.use(express.json())

//Establecemos el puerto
const PORT = 3000

//Crear la base de datos
const db = new Database('Citas-Medicas.db')


//Endpoint de tipo get para mostrar los datos.
app.get('/citas', (_req, res)=> {
//Recuperamos los datos de la tabla pacientes
  const ObtenerTodos = db.prepare('SELECT * from citas')
  const ListaCitas = ObtenerTodos.all()
  //Mostramos los datos
  res.send(ListaCitas)
})



//Reglas de validación de express-validator
const validaCita = [
  body('patientName').trim().notEmpty().withMessage('Falta el nombre del paciente'),
  body('doctorName').trim().notEmpty().withMessage('Falta el nombre del doctor'),
  body('appoinmentDate').trim().notEmpty().withMessage('Falta la fecha de la cita')
  .isISO8601().withMessage('Formato incorrecto'),

  body('reason').trim().notEmpty().withMessage('No existe una razón para la cita'),
  body('status').trim().notEmpty().withMessage('Todas las citas deben tener un estado')
]

//Endpoint de tipo post que ingresa nuevos registros a la base de datos
app.post('/citas/add', validaCita, (req: Request, res: Response) => {
  
  //Validar errores en el ingreso de datos.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const {patientName, doctorName, appoinmentDate, reason, status} = req.body


  try {
    const stmt = db.prepare('INSERT INTO citas (patientName, doctorName, appoinmentDate, reason, status) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(patientName, doctorName, appoinmentDate, reason, status);

    return res.status(201).json({ id: result.lastInsertRowid, patientName, doctorName, appoinmentDate, reason, status });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al insertar el paciente' });
  }

})


//Endpoint para editar registros
app.put('/citas/edit/:id', (req, res) => {
  //Comprobar la existencia del id del registro
  const id = Number(req.params.id);
  if(isNaN(id)){
    return res.status(400).json({error:'ID ivalido'})
  }

  const {patientName, doctorName, appoinmentDate, reason, status} = req.body
  
  const campos: string[] = [];
  const values: any[] = [];

  if (patientName) {
    campos.push('patientName = ?');
    values.push(patientName);
  }
  if (doctorName) {
    campos.push('doctorName = ?');
    values.push(doctorName);
  }
  if (appoinmentDate) {
    campos.push('appoinmentDate = ?');
    values.push(appoinmentDate);
  }
  if (reason) {
    campos.push('reason = ?');
    values.push(reason);
  }
  if (status) {
    campos.push('status = ?');
    values.push(status);
  }

  // Agregar el id al final para el WHERE
  values.push(id);

  const consulta = `UPDATE citas SET ${campos.join(', ')} WHERE id = ?`;

  try {
    const stmt = db.prepare(consulta);
    const result = stmt.run(...values);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    return res.json({ message: 'cita actualizada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar cita' });
  }

})


//Endpoint para eliminar registros
app.delete('/citas/delete/:id', (req, res) => {
  //COmprobar id
  const id = Number(req.params.id);
  if(isNaN(id)){
    return res.status(400).json({error:'ID inválido'});
  }

  //Eliminar paciente
  try{
    const ComandoSql = db.prepare(`Delete from citas where id = ?`)
    const resultado = ComandoSql.run(id);

    if(resultado.changes === 0){
      return res.status(404).json({error: 'Cita no encontrada'})
    }
    return res.json({message: 'Cita eliminada'})
  } catch (error){
    console.error(error)
    return res.status(500).json({error:'Error al eliminar'})
  }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
