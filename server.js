const express = require("express");
const cors = require("cors");
const digimones = require("./digimones.json");

//EJECUTAR EXPRESS PARA QUE NOS RETORNE A LA VARIABLE APP TODOS LOS MÉTODOS NECESARIOS
//PARA LEVANTAR UN SERVIDOR
const app = express();

// Middlewares
app.use(cors());

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

//RUTA FILTRO DIGIMONES POR NOMBRE
app.get("/api/digimones/nombre/:nombre", (req, res) => {
    let { nombre } = req.params;
    let digimonesFiltrados = digimones.find(
        (digimon) => digimon.name.toLowerCase() == nombre.toLocaleLowerCase()
    );

    //SI EL NOMBRE PROPORCIONADO POR EL CLIENTE NO TIENE COINCIDENCIAS
    //ENIAMOS UN MENSAJE DE DIGIMON NO ENCONTRADO POR CÓDIGO HTTP 404
    if (digimonesFiltrados.length == 0) {
        return res
            .status(404)
            .send({ message: `Digimon ${nombre} no encontrado` });
    }

    //SI ENCONTRAMOS AL DIGIMON ENVIAMOS LA RESPUESTA
    res.send(digimonesFiltrados);
});

//AGREGAR ENDPOINT GET FILTRO POR NIVEL
app.get("/api/digimones/nivel/:nivel", (req, res) => {
    let { nivel } = req.params;
    let digimonesFiltrados = digimones.filter(
        (digimon) => digimon.level.toLowerCase() == nivel.toLowerCase()
    );
    console.log(digimonesFiltrados);
    res.send("Ruta nivel");
});

//AGREGAR ENDPOINT QUE PERMITA A LOS USUARIOS CREAR SU PROPIO DIGIMON

//PERMITIR QUE LOS USUARIOS PUEDAN ELIMINAR DIGIMONES, PERO SÓLO LOS QUE FUERON AGREGADOS
//ADICIONALMENTE
