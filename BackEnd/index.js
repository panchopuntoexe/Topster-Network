const express = require('express');
const app = express();
const controlador = require('./controlador')
var cors = require('cors')

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)
app.use(cors())

//http://localhost:3000/album/
app.get('/album/', (req, res) => {
    try {
        res.json(controlador.mostrarListaDeAlbums());
    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar albums"
            }
        );
    }
})

//http://localhost:3000/cancion/
app.get('/cancion/', (req, res) => {
    try {
        res.json(controlador.mostrarListaDeCanciones());
    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar canciones"
            }
        );
    }
})

//http://localhost:3000/album/1
app.get('/album/:id', (req, res) => {
    let album = req.params.id;
    try {
        res.json(JSON.parse(controlador.mostrarAlbum(album)));
    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar album"
            }
        );
    }
})

//http://localhost:3000/cancion/1
app.get('/cancion/:id', (req, res) => {
    let cancion = req.params.id;
    try {
        res.json(controlador.mostrarCancion(cancion));
    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar canción"
            }
        );
    }
})

//http://localhost:3000/album/NEU!&PinkFloyd&false&Rubin&1975
//:titulo&:artista&:recopilatorio&:productor&:anio
app.post('/album', (req, res) => {
    /*let titulo = req.params.titulo
    let artista = req.params.artista
    let recopilatorio = Boolean(req.params.recopilatorio)
    let productor = req.params.productor
    let anio = Number(req.params.anio)*/

    let titulo = req.body.titulo
    let artista = req.body.artista
    let recopilatorio = Boolean(req.body.recopilatorio)
    let productor = req.body.productor
    let anio = Number(req.body.anio)

    try {
        let datosAlbum={
            titulo: titulo,
            artista: artista,
            recopilatorio: recopilatorio,
            productor: productor,
            anio: anio
        }
        controlador.crearAlbum(datosAlbum)
        res.json(controlador.mostrarListaDeAlbums());
    } catch (e) {
        res.json(
            {
                "error": "Error al crear albums"
            }
        );
    }
})

//http://localhost:3000/cancion/MySweetLord&456&false&false&1
///:indiceAlbum&:titulo&:duracion&:explicito&:artistaSecundario
app.post('/cancion/:indiceAlbum', (req, res) => {
    /*let titulo = req.params.titulo
    let duracion = Number(req.params.duracion)
    let explicito = Boolean(req.params.explicito)
    let artistaSecundario = req.params.artistaSecundario
    let indiceAlbum = Number(req.params.indiceAlbum)*/


    let titulo = req.body.titulo
    let duracion = Number(req.body.duracion)
    let explicito = Boolean(req.body.explicito)
    let artistaSecundario = req.body.artistaSecundario
    let indiceAlbum = Number(req.params.indiceAlbum)

    try {
        let datosCancion={
            titulo: titulo,
            duracion: duracion,
            explicito: explicito,//boolean/undefined
            artistaSecundario: artistaSecundario
        }
        controlador.crearCancion(datosCancion,indiceAlbum)
        res.json(controlador.mostrarListaDeCanciones());
    } catch (e) {
        res.json(
            {
                "error": "Error al crear albums"
            }
        );
    }
})

//http://localhost:3000/cancion/1&MySweetLord&456&false&false
//&:titulo&:duracion&:explicito&:artistaSecundario
app.put('/cancion/:cancionAActualizar', (req, res) => {
    let titulo = req.body.titulo
    let duracion = Number(req.body.duracion)
    let explicito = Boolean(req.body.explicito)
    let artistaSecundario = req.body.artistaSecundario
    let cancionAActualizar = Number(req.params.cancionAActualizar)


    try {
        let datosCancion={
            titulo: titulo,
            duracion: duracion,
            explicito: explicito,
            artistaSecundario: artistaSecundario
        }
        controlador.actualizarCancion(datosCancion, cancionAActualizar)
        console.log(datosCancion)
        res.json(controlador.mostrarCancion(cancionAActualizar))
    } catch (e) {
        res.json(
            {
                "error": "Error al actualizar canción"
            }
        );
    }
})

//http://localhost:3000/album/1&NEU!&PinkFloyd&false&Rubin&1975
//&:titulo&:artista&:recopilatorio&:productor&:anio
app.put('/album/:albumAActualizar', (req, res) => {
    let titulo = req.body.titulo
    let artista = req.body.artista
    let recopilatorio = Boolean(req.body.recopilatorio)
    let productor = req.body.productor
    let anio = Number(req.body.anio)
    let albumAActualizar = Number(req.params.albumAActualizar)

    try {
        let datosAlbum={
            titulo: titulo,
            artista: artista,
            recopilatorio: recopilatorio,
            productor: productor,
            anio: anio
        }
        controlador.actualizarAlbum(datosAlbum,albumAActualizar)
        res.json(controlador.mostrarListaDeAlbums());
    } catch (e) {
        res.json(
            {
                "error": "Error al actualizar album"
            }
        );
    }
})

//http://localhost:3000/cancion/1
app.delete('/cancion/:id', (req, res) => {
    let cancionAEliminar = req.params.id;
    try {
        controlador.eliminarCancion(cancionAEliminar);
        res.json(
            {
                "response": "cancionEliminada"
            }
        );
    } catch (e) {
        res.json(
            {
                "error": "Error al eliminar autor"
            }
        );
    }
})

//http://localhost:3000/album/1
app.delete('/album/:id', (req, res) => {
    let albumAEliminar = req.params.id;
    try {
        controlador.eliminarAlbum(albumAEliminar);
        res.json(
            {
                "response": "album eliminado"
            }
        );
    } catch (e) {
        res.json(
            {
                "error": "Error al eliminar album"
            }
        );
    }
})

//Iniciando el servidor, escuchando...
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});