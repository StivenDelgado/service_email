import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.NODEMAILER_KEY,
    },
});

export async function sendEmail(subject, message, email, name) {
    try {
        const info = await transporter.sendMail({
            from: '"LValentinaUGC" <stiven03dg@gmail.com>',
            to: "laurabrian17@gmail.com",
            subject: subject,
            text: message,
            html: html(email, name, subject, message)
        });
        console.log(`Correo enviado a ${"laurabrian17@gmail.com"}: ${info.messageId}`);
        return info.messageId;
    } catch (error) {
        console.error(`Error al enviar correo a ${"laurabrian17@gmail.com"}:`, error.message);
        throw error; // Relanzar el error para que el llamador lo maneje
    }
}

const html = (email, name, subject, message) => {
    return  `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contacto - LValentinaUGC</title>
<style>
/* Estilos generales */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    line-height: 1.6;
}

/* Contenedor principal del correo */
.email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Encabezado */
.header {
    background-color: #503512; /* Nuevo color principal */
    color: #ffffff;
    text-align: center;
    padding: 20px;
}

.header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
}

/* Contenido principal */
.content {
    padding: 20px;
    color: #333333;
}

.content h2 {
    font-size: 20px;
    margin-bottom: 16px;
    color: #503512; /* Nuevo color secundario */
}

.content p {
    font-size: 16px;
    margin-bottom: 16px;
}

/* Pie de página */
.footer {
    text-align: center;
    padding: 20px;
    background-color: #f4f4f4;
    color: #777777;
    font-size: 14px;
}

.footer a {
    color: #503512; /* Nuevo color principal */
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}

/* Estilos responsivos */
@media only screen and (max-width: 600px) {
    .email-container {
        border-radius: 0;
    }

    .header h1 {
        font-size: 20px;
    }

    .content h2 {
        font-size: 18px;
    }

    .content p {
        font-size: 14px;
    }
}
</style>
</head>
<body>
<div class="email-container">
    <div class="header">
        <h1>LValentinaUGC</h1>
    </div>
    <div class="content">
        <h2>Nuevo Mensaje de Contacto</h2>
        <p>Hola,</p>
        <p>Has recibido un nuevo mensaje de contacto a través de LValentinaUGC:</p>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
        <p>Gracias por utilizar <strong>LValentinaUGC</strong>.</p>
    </div>
    <div class="footer">
        <p>Este correo fue enviado por <a href="https://lvalentinaugc.com">LValentinaUGC</a>. Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>&copy; 2025 LValentinaUGC. Todos los derechos reservados.</p>
    </div>
</div>
</body>
</html>
    `

}