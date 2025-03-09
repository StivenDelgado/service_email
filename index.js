// server.js (Backend con Express)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./src/util/email.js";

dotenv.config();
// Configura CORS para permitir solo un origen específico
const allowedOrigins = [
    "https://lvalentinaugc.vercel.app", // Tu sitio principal
    "http://localhost:8080", // Para desarrollo local
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Permitir la solicitud
        } else {
            callback(new Error("Origen no permitido por CORS")); // Bloquear la solicitud
        }
    },
    optionsSuccessStatus: 200, // Algunos navegadores requieren esto
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());


app.post("/api/v1/send-email", async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    try {
        const response = await sendEmail(subject, message, email, name);
        console.log(`Correo enviado: ${response}`);
        res.status(200).json({ message: "Correo enviado con éxito" });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ message: "Error al enviar el correo" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});