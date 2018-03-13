const pg = require('pg');
const config = {
    user: 'lemo',
    database: 'hapidb',
    password: 'zeng?vyv123',
    tableName: 'rabbit'
};
 
const pool = new pg.Pool(config);
class LocalDb {
    constructor(){}
    
 
    query(sql, params){
        return new Promise((resolve, reject)=> {
           // if(Array.isArray(params)) {
                //if(params.length > 0) {
                    pool.connect((err, client, done)=>{
                        if (err) {
                            reject(err);
                        }
                        client.query(sql, params)
                            .then(result => {
                                done();
                                console.log(result.rows);
                                resolve(result.rows);
                            })
                            .catch(err => {
                                done();
                                reject(new Error(err))
                            })
                    });
               // }
           // } else {
                //reject('Error: params are NaN, checkout input parameters ' + params);
           // }
        })
 
    };
 
    insertData(data, type){
        this.query(`INSERT INTO ${config.tableName} (data, type, date) VALUES ($1, $2, $3)`, [data, type, new Date().toISOString()]);
    }

    getAllLogs(){
        this.query(`SELECT * FROM ${config.tableName}`);
    }
}
const dbClient = new LocalDb();
module.exports = dbClient;