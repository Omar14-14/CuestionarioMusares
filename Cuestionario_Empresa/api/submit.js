// api/submit.js

// Variable global para almacenar respuestas (solo para demostración; no es persistente)
let responses = [];

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let body = req.body;

        // Si los datos vienen como cadena (URL-encoded), se parsean:
        if (typeof body === 'string') {
            const params = new URLSearchParams(body);
            body = {};
            for (const [key, value] of params) {
                body[key] = value;
            }
        }

        responses.push(body);
        console.log('Respuesta guardada:', body);
        return res.status(200).json({ message: '¡Respuesta guardada!', data: body });

    } else if (req.method === 'GET') {
        // Devuelve todas las respuestas almacenadas
        return res.status(200).json({ responses });

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Método ${req.method} no permitido`);
    }
}
