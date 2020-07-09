// const ibmdb = require("ibm_db");
 
// const connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-10.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=rjl21106;PWD=2zpgwx+ptfnpr1lr"

// const conn = ibmdb.openSync(connStr);

// module.exports = conn;
 

// const mysql = require("mysql");
// var mysqlConnection = mysql.createConnection({
//     host : "mymysqlserverkr.mysql.database.azure.com",
//     user : "azureuser@mymysqlserverkr",
//     password :"Azure@94",
//     database : "db",
//     multipleStatements: true,
// });
 
// mysqlConnection.connect((err)=>{
//     if(!err)
//         {
//         console.log("Connected");
    
//         }
//     else
//         {
//         console.log("Connection Failed",err);
//         }
 
// });
 
// module.exports = mysqlConnection;
//var request = require('request');
// const{Connection,Request}= require("tedious");
 
// // Create connection to database
// const config={
//  authentication:{
//  options:{
//  userName:"azureuser",// update me
//  password:"Azure@94",
// // update me
// },
//  type:"default"
// },
//  server:"mysqlserverkr.database.windows.net",// update me
//  options:{
//  database:"mySampleDatabase",//update me
//  encrypt:true,
//  rowCollectionOnRequestCompletion:true,
//  useColumnNames:true
 
// }
// };
 
// const connection = new Connection(config);
// //config.options.rowCollectionOnRequestCompletion
 
// // Attempt to connect and execute queries if connection goes through
// connection.on("connect",err=>{
//     if (err) {
//     console.error(err.message);
//     }else{
//     //queryDatabase();
    
//     } 
// });
 
//module.exports = requests;

//amazon db connections
const{Connection,Request}= require("tedious");
 
// Create connection to database
const config={
 authentication:{
 options:{
 userName:"admin",// update me
 password:"Qwerty123",
 port : "1433"
// update me
},
 type:"default"
},
 server:"database-2.cd9rlofafsjc.us-east-2.rds.amazonaws.com",// update me
 options:{
 database:"AWS",//update me
 encrypt:true,
 rowCollectionOnRequestCompletion:true,
 useColumnNames:true
 
}
};
 
const connection = new Connection(config);
//config.options.rowCollectionOnRequestCompletion
 
// Attempt to connect and execute queries if connection goes through
connection.on("connect",err=>{
    if (err) {
    console.error(err.message);
    }else{
    //queryDatabase();
    console.log("Connected to AWS DB");
    
    } 
});
module.exports=connection;