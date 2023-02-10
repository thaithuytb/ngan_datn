// reuire the dependencies just installed from above commands
const sql = require('mssql/msnodesqlv8');

var config = {
    server : "your servername\\instancename",
    database: "your db name",
    user :'sa',      
    password:"your password",
    options :{
       rustedConnection:true,
    },
    driver:"msnodesqlv8",
 }

 module.exports = {
    connect: new sql.ConnectionPool(config).connect().then(pool => pool),
    sql: sql
 }


