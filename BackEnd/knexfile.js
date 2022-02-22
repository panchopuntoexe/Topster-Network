const Console = require("console");
const seguimientoInterfaz = require('./Interfaces/SeguimientoInterfaz')
const reaccionInterfaz = require('./Interfaces/ReaccionInterfaz')
const comentarioInterfaz = require('./Interfaces/ComentarioInterfaz')
const postInterfaz = require('./Interfaces/PostInterfaz')
const usuarioInterfaz = require('./Interfaces/UsuarioInterfaz')

const db = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : '',
        database : 'dbtopstersnewtwork'
    }
});

async function consultarUsuarioPorId(idUsuario){
    let retorno={};
    await db.from('usuario').select("*").where('ID_USUARIO', idUsuario)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno
}

async function consultarUsuarios(){
    let retorno={};
    await db.from('usuario').select("*")
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno
}

async function crearUsuario(usuario){
    let retorno={};
    await db('post').insert({ FOTO_PERFIL: usuario.fotoDePerfil,
        NICKNAME:usuario.nickname,
        BIOGRAFIA:usuario.biografia,
        APELLIDOS_USUARIO:usuario.apellidos,
        NOMBRES_USUARIO:usuario.nombres,
        CORREO:usuario.correo,
        CLAVE:usuario.clave,
        FECHA_NACIMIENTO:usuario.fechaDeNacimiento,
        GENERO:usuario.genero})
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function actualizarUsuario(usuario){
    let retorno={};
    await db('post') .where({ ID_USUARIO: usuario.idUsuario }).insert({ FOTO_PERFIL: usuario.fotoDePerfil,
        NICKNAME:usuario.nickname,
        BIOGRAFIA:usuario.biografia,
        APELLIDOS_USUARIO:usuario.apellidos,
        NOMBRES_USUARIO:usuario.nombres,
        CORREO:usuario.correo,
        CLAVE:usuario.clave,
        FECHA_NACIMIENTO:usuario.fechaDeNacimiento,
        GENERO:usuario.genero})
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function consultarPosts(){
    let retorno={};
    await db.from('post').select("*")
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno
}

async function consultarPostsPorUsuarioId(idUsuario){
    let retorno={};
    await db.from('post').select("*").where('ID_USUARIO', idUsuario)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function crearPost(post){
    let retorno={};
    await db('post').insert({ FOTO_POST: post.foto,
                            DESCRIPCION_POST:foto.descripcionComentario,
                            ID_USUARIO:foto.idUsuario,
                            FECHA_POST:tomarFechaDeHoy()})
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function consultarComentariosPorPostId(idPost){
    let retorno={};
    await db.from('comentario').select("*").where('ID_POST', idPost)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function crearComentario(comentario){
    let retorno={};
    await db('comentario').insert({ ID_POST: comentario.idPost,
                                    DESCRIPCION_COMENTARIO:comentario.descripcionComentario,
                                    ID_USUARIO:comentario.idUsuario,
                                    FECHA_COMENTARIO:tomarFechaDeHoy()})
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function consultarReaccionesPorPostId(idPost){
    let retorno={};
    await db.from('recciones').select("*").where('ID_POST', idPost)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function eliminarReaccion(idReaccion){
    let retorno={};
    await db.from('reacciones').where('ID_REACCION', idReaccion).del()
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function crearReaccion(reaccion){
    let retorno={};
    await db('reacciones').insert({ID_TIPO_REACCION: reaccion.idTipoDeReaccion,
                                    ID_POST: reaccion.idPost,
                                    ID_USUARIO:reaccion.idUsuario})
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

async function consultarTipoDeReaccion(idTipoDeReaccion){
    let retorno={};
    await db.from('tipo_de_reaccion').select("*").where('ID_TIPO_REACCION', idTipoDeReaccion)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

//quién le sigue al usuario 	ID_USUARIO?
async function consultarSeguimientoDeUsuarioId(idUsuario){
    let retorno={};
    await db.from('seguimiento').select("*").where('ID_USUARIO', idUsuario)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

//eliminar relacion de seguimiento 
async function eliminarSeguimiento(idRelacion){
    let retorno={};
    await db.from('seguimiento').where('ID_RELACION ', idRelacion).del()
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}

//crear relacion de seguimiento 
async function crearSeguimiento(seguimiento){
    let retorno={};
    await db('seguimiento').insert({ID_USUARIO: seguimiento.idUsuarioASeguir,
                                    USU_ID_USUARIO: seguimiento.idUsuarioSeguidor,
                                    FECHA_RELACION:tomarFechaDeHoy()})
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });
    return retorno;
}


/*let seguimiento = seguimientoInterfaz.seguimiento
seguimiento.idUsuarioASeguir=1
seguimiento.idUsuarioSeguidor=2*/

/*let reaccion = reaccionInterfaz.reaccion
reaccion.idTipoDeReaccion=1
reaccion.idPost=1
reaccion.idUsuario=2*/

/*let comentario = comentarioInterfaz.comentario
comentario.descripcionComentario="Holi bb muy buen topster"
comentario.idPost=1
comentario.idUsuario=2*/

crearComentario(comentario).then(
    (data)=>{
        console.log(data);})

module.exports = {
    db,
    consultarUsuarioPorId,consultarUsuarios,crearUsuario,actualizarUsuario,
    consultarPosts,consultarPostsPorUsuarioId,crearPost,
    consultarComentariosPorPostId,crearComentario,
    consultarReaccionesPorPostId,eliminarReaccion,crearReaccion,
    consultarTipoDeReaccion,
    consultarSeguimientoDeUsuarioId, eliminarSeguimiento,crearSeguimiento
    
};

function tomarFechaDeHoy(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date+' '+time;
}
