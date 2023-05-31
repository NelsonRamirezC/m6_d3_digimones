const express = require("express");
const digimones = require("./digimones.json");

//EJECUTAR EXPRESS PARA QUE NOS RETORNE A LA VARIABLE APP TODOS LOS MÉTODOS NECESARIOS
//PARA LEVANTAR UN SERVIDOR
const app = express();

const PORT = 3000;
//MÉTODO QUE PERMITE ESCUCHAR PETICIONES A TRAVÉS DEL PUERTO 3000
app.listen(PORT, () =>
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
);

//RUTA
//ruta principal del proyecto
app.get(["/", "/home"], (req, res) => {
    //ENVIAMOS UN DOCUMENTO HTML A LAS APLICACIONES CLIENTE PARA QUE PUEDAN
    //VER LA DOCUMENTACIÓN DE NUESTRA API
    res.sendFile(__dirname + "/public/index.html");
});

//ENDPOINTS
app.get("/api/digimones", (req, res) => {
    //res.sendFile(__dirname + "/digimones.json");
    res.send(digimones);
});
