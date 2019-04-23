var sql = require('mysql');

class MySqlQuery{

    constructor(){
        this.CreateConnection();
        this.ConnectToDB((error) =>{
            if(error)
                throw(error);
        })
    }

    CreateConnection() {
        this.connection = sql.createConnection({
            host: 'localhost',
            user: 'RCGClient',
            password: 'rcgclient',
            database: 'RCGDB'
        });
    }

    RequestFoodsByName(foodname, callback){
        console.log("[MySql - Food] Requestion food for " + foodname)
        
        this.QueryDBForFood(foodname,(errorDB,response) =>{
            if(errorDB){
                callback(errorDB,null);
                this.connection.end();
            }
            callback(null,response);
        })
        
    }

    ConnectToDB(callback){
        console.log("[MySql] Connecting to RCG database...");
        this.connection.connect(function(err){
            if(err){
                console.log(err);
                callback(true);
                return;
            }
            console.log("[MySql] Connected to RCG database")
            callback(false);
        }) 
    }

    QueryDBForFood(foodname,callback){
        const Query = 'SELECT * FROM foods';
        console.log('[MySql - Food] Requesting DB for food');
        this.connection.query(Query,foodname, (err,rows,field) =>{
            if(err){
                console.log(err);
                this.connection.end();
                callback(true);
                return;
            }
            
            let resp = [];
            for(var k in rows){
                if(rows[k].Name.includes(foodname)){
                    resp.push(rows[k]);
                }
            }

            console.log("[MySql - Food] Found " + resp.length + " results");

            callback(false,resp);
        })
    }
}

module.exports = MySqlQuery;


