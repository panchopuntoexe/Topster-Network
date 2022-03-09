const seguimientoInterfaz = require('./Interfaces/SeguimientoInterfaz')
const reaccionInterfaz = require('./Interfaces/ReaccionInterfaz')
const comentarioInterfaz = require('./Interfaces/ComentarioInterfaz')
const postInterfaz = require('./Interfaces/PostInterfaz')
const usuarioInterfaz = require('./Interfaces/UsuarioInterfaz')
const tipoDeReaccionInterfaz = require('./Interfaces/TipoDeReaccionInterfaz')

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
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//http://localhost:3000/usuario/1
app.get('/usuario/:id', (req, res) => {
    let usuarioId = req.params.id;
    try {
        controlador.consultarUsuarioPorId(usuarioId).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar usuario"
            }
        );
    }
})


//http://localhost:3000/usuarios/
app.get('/usuarios/', (req, res) => {
    try {
        controlador.consultarUsuarios().then(
            (data) => {
                res.json(data);
            })
    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar usuarios"
            }
        );
    }
})

//http://localhost:3000/usuarios/nickname

app.get('/usuarios/:nickname', (req, res) => {

    let nickname = req.params.nickname;
    try {
        controlador.consultarUsuarioPorNombre(nickname).then(
            (data) => {
                res.json(data);
            })
    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar usuarios"
            }
        );
    }
})

//http://localhost:3000/usuario/
app.post('/usuario/', (req, res) => {

    let datosUsuario = Object.assign({}, usuarioInterfaz.usuario)
    try {
        datosUsuario.idUsuario = req.body.idUsuario
        datosUsuario.fotoDePerfil = req.body.fotoDePerfil
        datosUsuario.biografia = req.body.biografia
        datosUsuario.apellidos = req.body.apellidos
        datosUsuario.nombres = req.body.nombres
        datosUsuario.correo = req.body.correo
        datosUsuario.clave = req.body.clave
        datosUsuario.fechaDeNacimiento = req.body.fechaDeNacimiento
        datosUsuario.genero = req.body.genero

        controlador.crearUsuario(datosUsuario).then(
            () => {
                controlador.consultarUsuarios().then(
                    (data) => {
                        res.json(data);
                    }
                )
            })
    } catch (e) {
        res.json(
            {
                "error": "Error al crear usuario"
            }
        );
    }
})

//http://localhost:3000/usuario/
app.put('/usuario/', (req, res) => {

    let datosUsuario = Object.assign({}, usuarioInterfaz.usuario)
    try {
        datosUsuario.idUsuario = req.body.idUsuario
        datosUsuario.fotoDePerfil = req.body.fotoDePerfil
        datosUsuario.biografia = req.body.biografia
        datosUsuario.apellidos = req.body.apellidos
        datosUsuario.nombres = req.body.nombres
        datosUsuario.correo = req.body.correo
        datosUsuario.clave = req.body.clave
        datosUsuario.fechaDeNacimiento = req.body.fechaDeNacimiento
        datosUsuario.genero = req.body.genero
        controlador.actualizarUsuario(datosUsuario)
    } catch (e) {
        res.json(
            {
                "error": "Error al crear usuario"
            }
        );
    }
})

//http://localhost:3000/post/
app.get('/post/', (req, res) => {
    try {
        controlador.consultarPosts().then(
            (data) => {
                res.json(data);
            })
    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar post"
            }
        );
    }
})

//http://localhost:3000/post/usuarioid
app.get('/post/:usuarioid', (req, res) => {
    let usuarioId = req.params.usuarioid;
    try {
        controlador.consultarPostsPorUsuarioId(usuarioId).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar Posts"
            }
        );
    }
})

//http://localhost:3000/post/
app.post('/post/', (req, res) => {

    let datosPost = Object.assign({}, postInterfaz.post)
    try {
        datosPost.foto = req.body.foto
        datosPost.descripcion = req.body.descripcion
        datosPost.idUsuario = req.body.idUsuario
        controlador.crearPost(datosPost).then(
            () => {
                controlador.consultarPosts().then(
                    (data) => {
                        res.json(data);
                    }
                )
            })
    } catch (e) {
        res.json(
            {
                "error": "Error al crear post"
            }
        );
    }
})

//http://localhost:3000/comentario/postId
app.get('/comentario/:postId', (req, res) => {
    let postId = req.params.postId;
    try {
        controlador.consultarComentariosPorPostId(postId).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar Comentario"
            }
        );
    }
})
//http://localhost:3000/comentario/
app.post('/comentario/', (req, res) => {

    let datosComentario = Object.assign({}, comentarioInterfaz.comentario)
    try {
        datosComentario.idPost = req.body.idPost
        datosComentario.descripcionComentario = req.body.descripcionComentario
        datosComentario.idUsuario = req.body.idUsuario
        controlador.crearComentario(datosComentario).then(
            (data) => {
                res.json(data);
            })
    } catch (e) {
        res.json(
            {
                "error": "Error al crear comentarios"
            }
        );
    }
})
//http://localhost:3000/reccion/postId
app.get('/reaccion/:postId', (req, res) => {
    let postId = req.params.postId;
    try {
        controlador.consultarReaccionesPorPostId(postId).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar Reacciones"
            }
        );
    }
})

//http://localhost:3000/idReaccion/
app.delete('/reaccion/:idReaccion', (req, res) => {
    let idReaccion = req.params.idReaccion;
    try {
        controlador.eliminarReaccion(idReaccion).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar Reacciones"
            }
        );
    }
})

//http://localhost:3000/reaccion/
app.post('/reaccion/', (req, res) => {

    let datosReaccion = Object.assign({}, reaccionInterfaz.reaccion)
    try {
        datosReaccion.idTipoDeReaccion = req.body.idTipoDeReaccion
        datosReaccion.idPost = req.body.idPost
        datosReaccion.idUsuario = req.body.idUsuario
        controlador.crearReaccion(datosReaccion).then(
            (data) => {
                res.json(data);
            })
    } catch (e) {
        res.json(
            {
                "error": "Error al crear reacción"
            }
        );
    }
})

//http://localhost:3000/tipoDeReaccion/idTipo
app.get('/tipoDeReaccion/:idTipo', (req, res) => {
    let idTipo = req.params.idTipo;
    try {
        controlador.consultarTipoDeReaccion(idTipo).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar Tipo de Reacciones"
            }
        );
    }
})

//quién le sigue al usuario ID_USUARIO?
//http://localhost:3000/seguimiento/usuarioid
app.get('/seguimiento/:usuarioid', (req, res) => {
    let usuarioid = req.params.usuarioid;
    try {
        controlador.consultarSeguimientoDeUsuarioId(usuarioid).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar seguimiento"
            }
        );
    }
})

//a quién sigue de usuario ID
//http://localhost:3000/seguidores/usuarioid
app.get('/seguidores/:usuarioid', (req, res) => {
    let usuarioid = req.params.usuarioid;
    try {
        controlador.consultarSeguidoresDeUsuarioId(usuarioid).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al mostrar seguimiento"
            }
        );
    }
})
//http://localhost:3000/seguimiento/idRelacion
app.delete('/seguimiento/:idRelacion', (req, res) => {
    let idRelacion = req.params.idRelacion;
    try {
        controlador.eliminarSeguimiento(idRelacion).then(
            (data) => {
                res.json(data);
            })

    } catch (e) {
        res.json(
            {
                "error": "Error al eliminar seguimiento"
            }
        );
    }
})
//http://localhost:3000/seguimiento/
app.post('/seguimiento/', (req, res) => {

    let datosSeguimiento = Object.assign({}, seguimientoInterfaz.seguimiento)
    try {
        datosSeguimiento.idUsuarioASeguir = req.body.idUsuarioASeguir
        datosSeguimiento.idUsuarioSeguidor = req.body.idUsuarioSeguidor
        controlador.crearSeguimiento(datosSeguimiento).then(
            (data) => {
                res.json(data);
            })
    } catch (e) {
        res.json(
            {
                "error": "Error al crear seguimiento"
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
        let datosCancion = {
            titulo: titulo,
            duracion: duracion,
            explicito: explicito,//boolean/undefined
            artistaSecundario: artistaSecundario
        }
        controlador.crearCancion(datosCancion, indiceAlbum)
        res.json(controlador.mostrarListaDeCanciones());
    } catch (e) {
        res.json(
            {
                "error": "Error al crear albums"
            }
        );
    }
})



//Iniciando el servidor, escuchando...
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});