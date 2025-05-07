"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
//Crear la base de datos
const db = new better_sqlite3_1.default('Citas-Medicas.db');
// Crea una tabla (solo la primera vez)
db.exec(`
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      edad INTEGER NOT NULL
    );
  `);
// Inserta un paciente
const insertar = db.prepare('INSERT INTO pacientes (nombre, edad) VALUES (?, ?)');
insertar.run('Juan Pérez', 30);
app.get('/ping', (_req, res) => {
    console.log('ALguien hizo ping');
    res.send('pong');
});
const obtenerTOdos = db.prepare('SELECT * from pacientes');
const pacientes = obtenerTOdos.all();
console.log(pacientes);
app.get('/ja', (_req, res) => {
    res.send(pacientes);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})