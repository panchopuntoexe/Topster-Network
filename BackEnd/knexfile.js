const Console = require("console");
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

db.from('usuario').select("*")
    .then((data) => {
            console.log(data);
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        db.destroy();
    });

module.exports = {
    db
};