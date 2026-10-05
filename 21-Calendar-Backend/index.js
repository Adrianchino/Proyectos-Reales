import path from 'path'
import express from "express";
import cors from 'cors'
import "dotenv/config";
import * as dotenv from 'dotenv';
import { router as authRoutes } from "./routes/auth.js";
import { dbConnection } from "./DB/config.js";
import { router as eventRoutes } from "./routes/events.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear el servidor se Express

const app = express();

// Base de datos
dbConnection();

// Cors
app.use(cors())


// Direcctorio Publico
app.use(express.static(path.join(__dirname, "Public")));

// Lectura y paseo del Body
app.use( express.json() );


//Rutas

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

// Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
