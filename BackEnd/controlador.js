const Console = require("console");
const seguimientoInterfaz = require('./Interfaces/SeguimientoInterfaz')
const reaccionInterfaz = require('./Interfaces/ReaccionInterfaz')
const comentarioInterfaz = require('./Interfaces/ComentarioInterfaz')
const postInterfaz = require('./Interfaces/PostInterfaz')
const usuarioInterfaz = require('./Interfaces/UsuarioInterfaz')
const tipoDeReaccionInterfaz = require('./Interfaces/TipoDeReaccionInterfaz')

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
         
    });
    return arrayDeObjectosAUsuarios(retorno)
}

async function consultarUsuarios(){
    let retorno={};
    await db.from('usuario').select("*")
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
    });
    return arrayDeObjectosAUsuarios(retorno)
}

async function consultarUsuarioPorNombre(nicknameUsuario){
    let retorno={};
    await db.from('usuario').select("*").whereILike('NICKNAME', '%'+nicknameUsuario+'%')
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
         
    });
    return arrayDeObjectosAUsuarios(retorno)
}

async function consultarUsuarioPorCorreo(correo){
    let retorno={};
    await db.from('usuario').select("*").whereILike('CORREO', '%'+correo+'%')
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
         
    });
    return arrayDeObjectosAUsuarios(retorno)
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
        console.log(retorno)
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
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
         
    });
    return arrayDeObjectosAPosts(retorno)
}

async function consultarPostsPorUsuarioId(idUsuario){
    let retorno={};
    await db.from('post').select("*").where('ID_USUARIO', idUsuario)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
         
    });
    return arrayDeObjectosAPosts(retorno);
}

async function crearPost(post){
    let retorno={};
    await db('post').insert({ FOTO_POST: post.foto,
                            DESCRIPCION_POST:post.descripcion,
                            ID_USUARIO:post.idUsuario,
                            FECHA_POST:tomarFechaDeHoy()})
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
         
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
         
    });
    return arrayDeObjectosAComentarios(retorno);
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
         
    });
    return arrayDeObjectosAReacciones(retorno);
}

async function eliminarReaccion(idReaccion){
    let retorno={};
    await db.from('reacciones').where('ID_REACCION', idReaccion).del()
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
         
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
         
    });
    return arrayDeObjectosATipoDeReaccion(retorno);
}

//quién le sigue al usuario ID_USUARIO?
async function consultarSeguimientoDeUsuarioId(idUsuario){
    let retorno={};
    await db.from('seguimiento').select("*").where('ID_USUARIO', idUsuario)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
         
    });
    return arrayDeObjectosASeguimientos(retorno);
}

//a quién sigue de usuario ID
async function consultarSeguidoresDeUsuarioId(idUsuario){
    let retorno={};
    await db.from('seguimiento').select("*").where('USU_ID_USUARIO', idUsuario)
    .then((data) => {
        //retorno = Object.assign({},data)
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
         
    });
    return arrayDeObjectosASeguimientos(retorno);
}

//eliminar relacion de seguimiento 
async function eliminarSeguimiento(idRelacion){
    let retorno={};
    await db.from('seguimiento').where('ID_RELACION ', idRelacion).del()
    .then((data) => {
        retorno = JSON.parse(JSON.stringify(data))
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
         
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



module.exports = {
    db,
    consultarUsuarioPorId,consultarUsuarios,consultarUsuarioPorNombre, consultarUsuarioPorCorreo, crearUsuario,actualizarUsuario,
    consultarPosts,consultarPostsPorUsuarioId,crearPost,
    consultarComentariosPorPostId,crearComentario,
    consultarReaccionesPorPostId,eliminarReaccion,crearReaccion,
    consultarTipoDeReaccion,
    consultarSeguimientoDeUsuarioId, consultarSeguidoresDeUsuarioId, eliminarSeguimiento,crearSeguimiento
    
};

function tomarFechaDeHoy(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date+' '+time;
}

function arrayDeObjectosAUsuarios(arrayDeObjectosSQL){
    let listaDeUsuarios =[]
    let usuarioAuxiliar = usuarioInterfaz.usuario
    arrayDeObjectosSQL.forEach(element => {
        usuarioAuxiliar.idUsuario=element.ID_USUARIO
        usuarioAuxiliar.fotoDePerfil=element.FOTO_PERFIL
        usuarioAuxiliar.nickname=element.NICKNAME
        usuarioAuxiliar.biografia=element.BIOGRAFIA
        usuarioAuxiliar.fechaDeNacimiento=element.FECHA_NACIMIENTO
        usuarioAuxiliar.apellidos=element.APELLIDOS_USUARIO
        usuarioAuxiliar.nombres=element.NOMBRES_USUARIO
        usuarioAuxiliar.correo=element.CORREO
        usuarioAuxiliar.clave=element.CLAVE
        usuarioAuxiliar.genero=element.GENERO

        listaDeUsuarios.push(Object.assign({},usuarioAuxiliar))
    });
    return listaDeUsuarios
}

function arrayDeObjectosAPosts(arrayDeObjectosSQL){
    let listaDePosts =[]
    let postAuxiliar = postInterfaz.post
    arrayDeObjectosSQL.forEach(element => {
        postAuxiliar.idPost=element.ID_USUARIO
        postAuxiliar.idUsuario=element.FOTO_PERFIL
        postAuxiliar.foto=element.FOTO_POST
        postAuxiliar.descripcion=element.DESCRIPCION_POST
        postAuxiliar.fecha=element.FECHA_POST

        listaDePosts.push(Object.assign({},postAuxiliar))
    });
    return listaDePosts
}

function arrayDeObjectosAComentarios(arrayDeObjectosSQL){
    let listaDeComentarios =[]
    let comentarioAuxiliar = comentarioInterfaz.comentario
    arrayDeObjectosSQL.forEach(element => {
        comentarioAuxiliar.idComentario=element.ID_COMENTARIO
        comentarioAuxiliar.idPost=element.ID_POST
        comentarioAuxiliar.idUsuario=element.ID_USUARIO
        comentarioAuxiliar.descripcionComentario=element.DESCRIPCION_COMENTARIO
        comentarioAuxiliar.fechaComentario=element.FECHA_COMENTARIO

        listaDeComentarios.push(Object.assign({},comentarioAuxiliar))
    });
    return listaDeComentarios
}

function arrayDeObjectosAReacciones(arrayDeObjectosSQL){
    let listaDeReacciones =[]
    let reaccionAuxiliar = reaccionInterfaz.reaccion
    arrayDeObjectosSQL.forEach(element => {
        reaccionAuxiliar.idReaccion=element.ID_REACCION
        reaccionAuxiliar.idPost=element.ID_POST
        reaccionAuxiliar.idTipoDeReaccion=element.ID_TIPO_REACCION
        reaccionAuxiliar.idUsuario=element.ID_USUARIO

        listaDeReacciones.push(Object.assign({},reaccionAuxiliar))
    });
    return listaDeReacciones
}

function arrayDeObjectosATipoDeReaccion(arrayDeObjectosSQL){
    let listaDeTipoReacciones =[]
    let tipoDeReaccionAuxiliar = tipoDeReaccionInterfaz.tipoDeReaccion
    arrayDeObjectosSQL.forEach(element => {
        tipoDeReaccionAuxiliar.idReaccion=element.ID_TIPO_REACCION
        tipoDeReaccionAuxiliar.nombreReaccion=element.NOMBRES_REACCION

        listaDeTipoReacciones.push(Object.assign({},tipoDeReaccionAuxiliar))
    });
    return listaDeTipoReacciones
}

function arrayDeObjectosASeguimientos(arrayDeObjectosSQL){
    let listaDeSeguimientos =[]
    let seguimientoAuxiliar = seguimientoInterfaz.seguimiento
    arrayDeObjectosSQL.forEach(element => {
        seguimientoAuxiliar.idSeguimiento=element.ID_RELACION
        seguimientoAuxiliar.idUsuarioASeguir=element.ID_USUARIO
        seguimientoAuxiliar.idUsuarioSeguidor=element.USU_ID_USUARIO
        seguimientoAuxiliar.fechaRelacion=element.FECHA_RELACION

        listaDeSeguimientos.push(Object.assign({},seguimientoAuxiliar))
    });
    return listaDeSeguimientos
}