// server.js (Backend con Express)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./src/util/email.js";

dotenv.config();

const app = express();
app.use(cors());
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