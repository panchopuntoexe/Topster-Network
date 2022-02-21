const Console = require("console");
const seguimientoInterfaz = require('./Interfaces/SeguimientoInterfaz')
const reaccionInterfaz = require('./Interfaces/ReaccionInterfaz')

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

/*db.from('usuario').select("*")
    .then((data) => {
            console.log(data);
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });*/



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

/*INSERT INTO `reacciones` (`ID_REACCION`, `ID_TIPO_REACCION`, `ID_POST`, `ID_USUARIO`, `TIPO_REACCION`) VALUES (NULL, '1', '1', '1', NULL); */
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

//eliminar relacion de seguimiento 
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

let reaccion = reaccionInterfaz.reaccion
reaccion.idTipoDeReaccion=1
reaccion.idPost=1
reaccion.idUsuario=2

crearReaccion(reaccion).then(
    (data)=>{
        console.log(data);})

module.exports = {
    db,
    consultarUsuarioPorId,consultarUsuarios,/*crearUsuario,actualizarUsuario,*/
    consultarPosts,consultarPostsPorUsuarioId,
    consultarComentariosPorPostId,/*crearComentario,*/
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
