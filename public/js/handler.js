const express = require("express");
const Router = express.Router();
const conn = require("./connection");
//const lodash = require("lodash");
//random value generation
//const random = require('random');


var path = require("path");
const{Connection,Request}=require("tedious");

Router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname+'/../../index.html'));
})

const superagent = require('superagent');

Router.get("/getIP", (req,resp)=>{
    var data;
    

    superagent.get('https://checkip.amazonaws.com').end((err, res) => {
        if (err) { 
            return console.log(err); 
        }
        console.log(res.body);
        console.log("res.text = ",res.text);
        // console.log('res = ',res)
        resp.send(res);
    });

    
})

// ----------------------------------------------Form1-------------------------------------------------
Router.post("/form1", (req,res)=>{
    var code = req.body.a1;
    // var year2 = req.body.a2;
    // var countryCode = req.body.a3;

    console.log("Country = ",code);
    var sql=`select * from s where code = '${code}';`;
    const request =new Request(sql,(err,rowCount,rows)=>{
        if (err) {
            console.error(err.message);
        }else{
         
            console.log(`${rowCount} row(s) returned`);
            console.log(rows);
            res.send(rows);
        }
        });
         
        conn.execSql(request);
});

// ----------------------------------------------Form2-------------------------------------------------
Router.post("/form2", (req,res)=>{
    var year1 = req.body.a1;
    var year2 = req.body.a2;
    // var countryCode = req.body.a3;

    
    var sql=`select * from s where Year between '${year1}' and '${year2}';`;
    const request =new Request(sql,(err,rowCount,rows)=>{
        if (err) {
            console.error(err.message);
        }else{
         
            console.log(`${rowCount} row(s) returned`);
            // console.log(rows);
            res.send(rows);
            }
        });
         
        conn.execSql(request);
});
// --------------------------------------------Form3 bar-------------------------------------------------
Router.post("/form3", (req,res)=>{
    var year1 = req.body.a1;//1980
    var year2 = req.body.a2;//2012
    var countryCode = req.body.a3;//2012

    console.log("year1 = "+year1 + " year2 = "+year2 + " countryCode = "+countryCode);
    var sql=`select * from s where code = '${countryCode}' and year between '${year1}' and '${year2}';`;
    const call=new Request(sql,(err,rowCount,rows)=>{
        if (err) {
        console.error(err.message);
        }else{
         
        console.log(`${rowCount} row(s) returned`);
        console.log(rows);
        res.send(rows);
        }
        });
         
        conn.execSql(call);
});



// ----------------------------------------------scatter-------------------------------------------------
Router.post("/example_graph", (req,res)=>{
    var fir = req.body.First;//1980
    var sec = req.body.Second;//2012
    var thr = req.body.Third;//2012
    var sql=`select * from s4 where entity = '${fir}' and year between '${sec}' and '${thr}';`;
    const call=new Request(sql,(err,rowCount,rows)=>{
        if (err) {
        console.error(err.message);
        }else{
         
        console.log(`${rowCount} row(s) returned`);
        console.log(rows);
        res.json(rows);
        }
        });
         
        conn.execSql(call);
});



// ----------------------------------------------pie-------------------------------------------------
Router.post("/pie_example", (req,res)=>{
    var fir = req.body.First;
    var sec = req.body.Second;
    var thr = req.body.Third;
    var sql=`select * from s4 where entity = '${fir}' and year between '${sec}' and '${thr}';`;
    const call=new Request(sql,(err,rowCount,rows)=>{
        if (err) {
        console.error(err.message);
        }else{
         
        console.log(`${rowCount} row(s) returned`);
        console.log(rows);
        res.json(rows);
        }
        });
         
        conn.execSql(call);
});


module.exports = Router;


    // const express = require("express");
    // const Router = express.Router();
    // const conn = require("../connection");
    // var path = require("path");
    // const {Connection,Request}= require("tedious");
    // const randomFloat = require('random-float');

// // for random value generation
// const random = require('random');
// //redis - ref : https://redislabs.com/get-started-with-redis/
// var redis = require("redis");
// var redisHost = 'redis-18761.c56.east-us.azure.cloud.redislabs.com';
// var redisPort = process.argv[3] || 18761;
// var redisAuth = 'oy6wGuEyOGpCMaRIiF27WPNljlpSqkEX';
// // var client = redis.createClient ({
// //     port : redisPort,
// //     host : redisHost
// // });  

// // client.auth(redisAuth, function(err, response){

// //     if(err){
// //         throw err;
// //     }
// //     else{
// //         console.log("Connection estabished to redis");
// //     }
// // });

// Router.get("/", (req,res)=>{
    
//     res.sendFile(path.join(__dirname+'/../home.html'));
//     // res.sendFile(path.join(__dirname+'/../sample1.html'));
// })

// //************Form1****************************
// Router.post("/form7", (req,res)=>{
    
//     var year1 = req.body.a1;
//     var year2 = req.body.a2;
//     var countryName = req.body.a3;
    
//     var sql= `select year,smokers from dbo.s4 where Entity = '${countryName}' and Year between ${year1} and ${year2}`;
    
//     // const starttime = Date.now();

//     const request = new Request(sql,(error,rowCount,rows)=>{
//         if (error) 
//         {
//             //console.log("inside error")
//             console.error(err.message);
//         }
//         else
//         {
//            console.log(`${rowCount} row(s) returned`);
//             // console.log("Number of data in 1 "+rows[0]);

//             // console.log("Number of data in 2 "+rows[1]);
            
//             // var newobj = {};
//             //newobj["timeTaken"] = Date.now() - starttime;    
//             //newobj["data"] = rows;
//             //rows.push(newobj);
//             res.json(rows);    
//         }
//     });
//     conn.execSql(request);

// })

// //************Form1****************************
// Router.post("/form1", (req,res)=>{
    
//     var year1 = req.body.a1;
//     var year2 = req.body.a2;
    
//     var sql= `Select year,NumberTerroristIncidents,Entity from dbo.ti where year between '${year1}' and '${year2}'`;
    
//     // const starttime = Date.now();

//     const request = new Request(sql,(error,rowCount,rows)=>{
//         if (error) 
//         {
//             //console.log("inside error")
//             console.error(err.message);
//         }
//         else
//         {
//            console.log(`${rowCount} row(s) returned`);
//             // console.log("Number of data in 1 "+rows[0]);

//             // console.log("Number of data in 2 "+rows[1]);
            
//             // var newobj = {};
//             //newobj["timeTaken"] = Date.now() - starttime;    
//             //newobj["data"] = rows;
//             //rows.push(newobj);
//             res.json(rows);    
//         }
//     });
//     conn.execSql(request);

// })

// //************Form1 function database****************************
// Router.post("/form1_twolat", (req,res)=>{
    
//     var countryCode = req.body.lat1;
//     // var lat2 = req.body.lat2;
    
//     var sql=`select year,NumberTerroristIncidents,Entity from dbo.ti where code = '${countryCode}' order by year asc`;
//     var newobj = {};
//     const starttime = Date.now();
//     const request = new Request(sql,(err,rowCount,rows)=>{
//         if (err) 
//         {
//             //console.log("inside error")
//             console.error(err.message);
//         }
//         else
//         {
//            // console.log(`${rowCount} row(s) returned`);
//             //console.log(rows);
//             newobj["timeTaken"] = Date.now() - starttime;
                
//                 //newobj["data"] = rows;
//             rows.push(newobj);
//             res.json(rows);    
//         }
//     });
//     conn.execSql(request);

// })

// //************Form11 function database****************************
// Router.post("/form11_twolat", (req,res)=>{
    
//     var year1 = req.body.lat1;
//     var year2 = req.body.lat2;
    
//     var sql= `Select year,NumberTerroristIncidents,Entity from dbo.ti where year between '${year1}' and '${year2}'`;
//     // var sql = `select top 5 * from dbo.sp;select top 10 * from dbo.sp;`;
//     var newobj = {};
//     const starttime = Date.now();
//     const request = new Request(sql,(err,rowCount,rows)=>{
//         if (err) 
//         {
//             //console.log("inside error")
//             console.error(err.message);
//         }
//         else
//         {
//            console.log(`${rowCount} row(s) returned`);
//             // console.log("Number of data in 1 "+rows[0]);

//             // console.log("Number of data in 2 "+rows[1]);
//             newobj["timeTaken"] = Date.now() - starttime;
                
//                 //newobj["data"] = rows;
//             rows.push(newobj);
//             res.json(rows);    
//         }
//     });
//     conn.execSql(request);

// })

// //************Form2 function database****************************
// Router.post("/form2_twolat", (req,res)=>{
//     // console.log('in database fun form2');
//     var val1 = Number(req.body.lat1);
//     var val2 = Number(req.body.lat2);
//     //var range = req.body.range;
    

//     var newobj = {};
//     var lowerlimit = val1
//     var upperlimit = val2;

//     if(val1>val2){
//         lowerlimit = val2;
//         upperlimit = val1;
//     }

//     // console.log('upperlimit = ',upperlimit);
//     //console.log(typeof(upperlimit));
    
//     const starttime = Date.now();
        
//     var sql = `select count(t.NumberTerroristIncidents) as Count,t.Entity from dbo.sp s, 
//     dbo.ti t where s.Prevalence between ${lowerlimit} and ${upperlimit} and s.Code = t.Code group by t.Entity order by t.entity`;
//     // console.log(sql);
//     const request = new Request(sql,(err,rowCount,rows)=>{
//         if (err) 
//         {
//             console.log("inside error")
//             console.error(err.message);
//         }
//         else
//         {
//            // console.log(`${rowCount} row(s) returned`);
//             //console.log(rows);
//             newobj["timeTaken"] = Date.now() - starttime;
//             console.log(newobj);

//                 //newobj["data"] = rows;
            
//             rows.push(newobj);
//             console.log(rows[rows.length-1])
//             res.json(rows);    
//         }
//     });
//     conn.execSql(request);

// })

// // //************Form111 function database****************************
// Router.post("/form111_twolat", (req,res)=>{
//     console.log('in database fun form111_twolat');
//     var year1 = req.body.lat1;
//     var year2 = req.body.lat2;
//     var range = req.body.range;

//     var newobj = {};
//     var lowerlimit = year1
//     var upperlimit = year2;

//     if(year1>year2){
//         console.log(typeof(lowerlimit));
//         lowerlimit = year2;
//         upperlimit = year1;
//     }
    

//     //console.log('lat1 = ',lat1,' lat2 = ',lat2,' range = ',range)
//     var datafetched = [];
//     var totalTime = 0;
//     callsqlfun(range,0,year1,year2);

//     function callsqlfun(range,i,year1,year2) {
//         const starttime = Date.now();
//         console.log('start time = ',starttime)

//         var sql = `Select year,NumberTerroristIncidents,Entity from dbo.ti where year between '${lowerlimit}' and '${upperlimit}'`;
       
//         if(i==range){
//             newobj["totalTime"] = totalTime;
//             datafetched.push(newobj)
//             res.json(datafetched);
//         }
//         else {

//             const request = new Request(sql,(err, rowCount, rows) => {
//                 if (err) {
//                     console.error(err.message);
//                 } else {
//                     newobj["count"] = rowCount;
//                     newobj["rows"] = rows;
//                     newobj["timeTaken"] = Date.now() - starttime; 
//                     totalTime = totalTime + newobj["timeTaken"];
//                     datafetched.push(newobj);
                    
//                 }
//             });
        
//             request.on('requestCompleted', function () { 
                
//                 callsqlfun(range,++i,year1,year2);

//             });

//             conn.execSql(request);
//         }
//     }
// })


// //************Form22 function database****************************
// Router.post("/form22_twolat", (req,res)=>{
//     console.log('in database fun form22');
//     var val1 = Number(req.body.lat1);
//     var val2 = Number(req.body.lat2);
//     var range = req.body.range;
    

//     var newobj = {};
//     var lowerLimit = val1;
//     var upperLimit = val2;

//     if(val1>val2){
//         lowerLimit = val2;
//         upperLimit = val1;
//     }
    

//     console.log(range);
//     var datafetched = [];
//     var totalTime = 0;
//     callsqlfun(range,0,lowerLimit,upperLimit);

//     function callsqlfun(range,i,lowerLimit,upperLimit) {
//         const starttime = Date.now();
//         console.log('start time = ',starttime)

//         var sql = `select count(t.NumberTerroristIncidents) as Count,t.Entity from dbo.sp s, dbo.ti t where s.Prevalence between ${lowerLimit} and ${upperLimit} and s.Code = t.Code group by t.Entity,t.NumberTerroristIncidents`;
        
//         if(i==range){
//             newobj["totalTime"] = totalTime;
//             datafetched.push(newobj)
//             res.json(datafetched);
//         }
//         else {
        
//             const request = new Request(sql,(err, rowCount, rows) => {
//                 if (err) {
//                     console.error(err.message);
//                 } else {
                    
//                     newobj["rows"] = rows;
//                     newobj["timeTaken"] = Date.now() - starttime; 
//                     totalTime = totalTime + newobj["timeTaken"];
//                     console.log(newobj)
//                     datafetched.push(newobj);
                    
//                 }
//             });
        
//             request.on('requestCompleted', function () { 
                
//                 callsqlfun(range,++i,lowerLimit,upperLimit);

//             });

//             conn.execSql(request);
//         }
//     }
    

// })


// Router.post("/form111_twolat_cache", (req,res)=>{
//     var dataFetched = [];
//     var year1 = (req.body.lat1);
//     var year2 = (req.body.lat2);
//     var range = (req.body.range);
//     var i = 0;
//     // client.set("setting", "hello");
//     // //
//     // client.get("setting", (err, data) => {
//     //     if (data != null) {
//     //         console.log(data.toString());
//     //     }
//     // });
//     var lowerlimit = year1
//     var upperlimit = year2;

//     if(year1>year2){
//         lowerlimit = year2;
//         upperlimit = year1;
//     }

//     var dataFetched = [];
//     var totalTime = 0;
    
//     callsqlfun(year1,year2);
    
//     function callsqlfun(year1,year2)
//     {
//         const starttime = Date.now();
//         var lowerLimit = year1;
//         var upperLimit = year2;
//         var newobj = {};
//         var sql = `Select year,NumberTerroristIncidents,Entity from dbo.ti where year between '${lowerLimit}' and '${upperLimit}'`;
//         var Key = year1 + "," + year2+"Years";
//         if(i==range)
//         {
//             newobj["totalTime"] = totalTime;
//             dataFetched.push(newobj)
//             res.json(dataFetched);
//         }
//         else
//         {
//             client.get(Key, (err, data) => {

//                 if (err || data == null) {
//                     console.log(data);
//                 }
//                 if (data != null){
//                     console.log("in function to fetch fro cache");
//                     var fromCache = JSON.parse(data.toString());
//                     newobj["count"] = fromCache.rowCount;
//                     newobj["rows"] = fromCache.rows;
//                     newobj["timeTaken"] = Date.now() - starttime; 
//                     totalTime = totalTime + newobj["timeTaken"];
//                     newobj["dbUsed"] = "Redis";
//                     dataFetched.push(newobj);
//                     // var year1 = (random.float(min = Number(year1),max = Number(year2))).toFixed(1);
//                     // var year2 = (random.float(min = Number(year1),max = Number(year2))).toFixed(1);
//                     i++;
//                     callsqlfun(year1,year2);
//                 } 
//                 else {
//                     const request = new Request(sql,(err, rowCount, rows) => {
//                         if (err) {
//                             console.error(err.message);
//                         } 
//                         else {
//                             console.log("in function to fetch fro SQL DB");
//                             newobj["count"] = rowCount;
//                             newobj["rows"] = rows;
//                             newobj["timeTaken"] = Date.now() - starttime; 
//                             totalTime = totalTime + newobj["timeTaken"];
//                             newobj["dbUsed"] = "DB";
                            
//                             dataFetched.push(newobj);
//                             client.set(Key, JSON.stringify(newobj));                    
//                             console.log(dataFetched);
//                         }
//                     });
//                     request.on('requestCompleted', function () { 
//                     i++;
//                         // var year1 = (random.float(min = Number(year1),max = Number(year2))).toFixed(1);
//                         // var year2 = (random.float(min = Number(year1),max = Number(year2))).toFixed(1);
//                     callsqlfun(year1,year2);
//                     });
//                     conn.execSql(request);
//                 }
//             });
        
//     } 
//     }
// });

// Router.post("/form22_twolat_cache", (req,res)=>{
    
//     var i = 0;
//     var val1 = Number(req.body.lat1);
//     var val2 = Number(req.body.lat2);
//     var range = req.body.range;

//     var lowerLimit = val1;
//     var upperLimit = val2;

//     if(val1>val2){
//         lowerLimit = val2;
//         upperLimit = val1;
//     }
    

//     console.log(range);
//     var dataFetched = [];
//     var totalTime = 0;
    
//     callsqlfun(lowerLimit,upperLimit);
    
//     var sql = `select count(t.NumberTerroristIncidents) as Count,t.Entity from dbo.sp s, dbo.ti t where s.Prevalence between ${lowerLimit} and ${upperLimit} and s.Code = t.Code group by t.Entity,t.NumberTerroristIncidents`;
//     var Key = lowerLimit + "," + upperLimit+"Prevalence";
    
//     function callsqlfun(lowerLimit,upperLimit)
//     {
//         const starttime = Date.now();
//         var newobj = {};
        
//         if(i==range)
//         {
//             newobj["totalTime"] = totalTime;
//             dataFetched.push(newobj)
//             res.json(dataFetched);
//         }
//         else
//         {
//             client.get(Key, (err, data) => {

//                 if (err || data == null) {
//                     console.log(data);
//                 }
//                 if (data != null){
//                     console.log("in function to fetch fro cache");
//                     var fromCache = JSON.parse(data.toString());
//                     newobj["count"] = fromCache.count;
//                     newobj["rows"] = fromCache.rows;
//                     newobj["timeTaken"] = Date.now() - starttime; 
//                     totalTime = totalTime + newobj["timeTaken"];
//                     newobj["dbUsed"] = "Redis";
//                     dataFetched.push(newobj);
//                     // var lowerLimit = (random.float(min = Number(lowerLimit),max = Number(upperLimit))).toFixed(1);
//                     // var upperLimit = (random.float(min = Number(lowerLimit),max = Number(upperLimit))).toFixed(1);
//                     i++;
//                     callsqlfun(lowerLimit,upperLimit);
//                 } 
//                 else {
//                     const request = new Request(sql,(err, rowCount, rows) => {
//                         if (err) {
//                             console.error(err.message);
//                         } 
//                         else {
//                             console.log("in function to fetch fro SQL DB");
//                             newobj["count"] = rowCount;
//                             newobj["rows"] = rows;
//                             newobj["timeTaken"] = Date.now() - starttime; 
//                             totalTime = totalTime + newobj["timeTaken"];
//                             newobj["dbUsed"] = "DB";
                            
//                             dataFetched.push(newobj);
//                             client.set(Key, JSON.stringify(newobj));                    
//                             console.log(dataFetched);
//                         }
//                     });
//                     request.on('requestCompleted', function () { 
//                     i++;
//                         // var lowerLimit = (random.float(min = Number(lowerLimit),max = Number(upperLimit))).toFixed(1);
//                         // var upperLimit = (random.float(min = Number(lowerLimit),max = Number(upperLimit))).toFixed(1);
//                     callsqlfun(lowerLimit,upperLimit);
//                     });
//                     conn.execSql(request);
//                 }
//             });
        
//     } 
//     }
//    });

// // Router.post("/form22_twolat", (req,res)=>{
// //     console.log('in database fun form111_twolat');
// //     var year1 = req.body.lat1;
// //     var year2 = req.body.lat2;
// //     var range = req.body.range;
// //     var rows = [{'timeTaken': 'cdsc'}]
// //     res.json(rows)
// // })

// // //************Form1 function database****************************
// // Router.post("/form1_twolat", (req,res)=>{
    
// //     var lat1 = req.body.lat1;
// //     var lat2 = req.body.lat2;
    
// //     var sql=`Select * from dbo.quakes1 where latitude between ${lat1} and ${lat2}`;
    
// //     const request = new Request(sql,(err,rowCount,rows)=>{
// //         if (err) 
// //         {
// //             //console.log("inside error")
// //             console.error(err.message);
// //         }
// //         else
// //         {
// //            // console.log(`${rowCount} row(s) returned`);
// //             //console.log(rows);
// //             res.json(rows);    
// //         }
// //     });
// //     conn.execSql(request);

// // })

// //***********Form 3 retrieving from a single query data using redis cache similar to FORM 1 **************
// Router.post("/form3_twolat_cache", (req,res)=>{

//     var lat1 = req.body.lat1;
//     var lat2 = req.body.lat2;

    
//     var sql=`Select * from dbo.quakes1 where latitude between ${lat1} and ${lat2}`;
//     //client.flushall();
//     // const starttime = Date.now();
//     var newobj = {};

//     var key = lat1+"_"+lat2+"form3_twolat_cache";

//     const starttime = Date.now();
//     client.get(key, function(error, cacheResponse){
//         if((error) || (cacheResponse == null) )
//          {
//             const request = new Request(sql,(err,rowCount,rows)=>{
//                 if (err) {
//                     console.error(err.message);
//                 }
//                 else
//                 {
//                     client.set(key,JSON.stringify(rows));
                    
//                     console.log(`${rowCount} row(s) returned`);
//                     console.log("Data Retrieved From DB");
//                     newobj["timeTaken"] = Date.now() - starttime;
//                     newobj["dataFrom"] = "data from DB";
//                     //newobj["data"] = rows;
//                     rows.push(newobj);
//                     console.log(rows);
//                     res.json(rows);
//                 }
//             });
//             conn.execSql(request);
//         }
//         else{
//             newobj["timeTaken"] = Date.now() - starttime;

//             console.log("Data Retrieved From Cache");
//             var cacheJsonData = JSON.parse(cacheResponse.toString());
            
//             newobj["dataFrom"] = "data from Cache";
//             cacheJsonData.push(newobj);
//             console.log(cacheJsonData);
//             res.json(cacheJsonData);     
//         }
//     });
// });



// // //************Form2 function database****************************
// // Router.post("/form2_twolat", (req,res)=>{
// //     console.log('in database fun form2');
// //     var lat1 = req.body.lat1;
// //     var lat2 = req.body.lat2;
// //     var range = req.body.range;

// //     var val1 = randomFloat(Number(lat1),Number(lat2)).toFixed(7);
// //     var val2 = randomFloat(Number(lat1),Number(lat2)).toFixed(7);


// //     //console.log('lat1 = ',lat1,' lat2 = ',lat2,' range = ',range)
// //     var datafetched = [];
   
// //     callsqlfun(val1,val2,range,0,lat1,lat2);

// //     function callsqlfun(val1,val2,range,i,lat1,lat2) {
// //         const starttime = Date.now();
// //         console.log('start time = ',starttime)

// //         var newobj = {};
// //         var lowerlimit = val1
// //         var upperlimit = val2;

// //         if(val1>val2){
// //             lowerlimit = val2;
// //             upperlimit = val1;
// //         }

// //         var sql = `Select locationSource,place,time,mag from dbo.quakes1 where latitude between ${lowerlimit} and ${upperlimit}`;
       
// //         if(i==range){
// //             console.log(datafetched);
// //             res.json(datafetched);
// //         }
// //         else {

// //             const call = new Request(sql,(err, rowCount, rows) => {
// //             if (err) {
// //                 console.error(err.message);
// //             } else {
// //                 newobj["count"] = rowCount;
// //                 newobj["random"] = lowerlimit + "  and  " + upperlimit;
// //                 newobj["timeTaken"] = Date.now() - starttime;
                
// //                 //newobj["data"] = rows;
// //                 datafetched.push(newobj);
// //                 //console.log(datafetched);
// //             }
// //             });
        
// //             call.on('requestCompleted', function () { 
                
// //                 var val1 = randomFloat(Number(lat1),Number(lat2)).toFixed(7);
// //                 var val2 = randomFloat(Number(lat1),Number(lat2)).toFixed(7);
// //                 callsqlfun(val1,val2,range,++i,lat1,lat2);

// //             });

// //             conn.execSql(call);
// //         }
// //     }
// // })

// //************Form3 function database using redis cache****************************
// Router.post("/form3_twolat", (req,res)=>{
//     console.log('in database fun form3');
//     var lat1 = req.body.lat1;
//     var lat2 = req.body.lat2;
//     var range = req.body.range;

//     var val1 = randomFloat(Number(lat1),Number(lat2)).toFixed(7);
//     var val2 = randomFloat(Number(lat1),Number(lat2)).toFixed(7);


//     //console.log('lat1 = ',lat1,' lat2 = ',lat2,' range = ',range)
//     var datafetched = [];
   
//     callsqlfun(val1,val2,range,0,lat1,lat2);

//     function callsqlfun(val1,val2,range,i,lat1,lat2) {
//         const starttime = Date.now();
//         console.log('start time = ',starttime)

//         var newobj = {};
//         var lowerlimit = val1
//         var upperlimit = val2;

//         if(val1>val2){
//             lowerlimit = val2;
//             upperlimit = val1;
//         }

//         var sql = `Select locationSource,place,time,mag from dbo.quakes1 where latitude between ${lowerlimit} and ${upperlimit}`;
       
//         if(i==range){
//             console.log(datafetched);
//             res.json(datafetched);
//         }
//         else {

//             const call = new Request(sql,(err, rowCount, rows) => {
//             if (err) {
//                 console.error(err.message);
//             } else {
//                 newobj["count"] = rowCount;
//                 newobj["random"] = lowerlimit + "  and  " + upperlimit;
//                 newobj["timeTaken"] = Date.now() - starttime;
                
//                 //newobj["data"] = rows;
//                 datafetched.push(newobj);
//                 //console.log(datafetched);
//             }
//             });
        
//             call.on('requestCompleted', function () { 
                
//                 var val1 = randomFloat(Number(lat1),Number(lat2)).toFixed(7);
//                 var val2 = randomFloat(Number(lat1),Number(lat2)).toFixed(7);
//                 callsqlfun(val1,val2,range,++i,lat1,lat2);

//             });

//             conn.execSql(call);
//         }
//     }
// })

// //************Form4 function multiple queries database using redis cache ****************************
// // https://tediousjs.github.io/tedious/api-request.html reference
// Router.post("/form4_twolat_cache", (req,res)=>{
//     var result = [];
//     var lat1 = Number(req.body.lat1);
//     var lat2 = Number(req.body.lat2);
//     var timenew = Number(req.body.range);
//     var i = 0;
//     client.set("setting", "hello");
//     //
//     client.get("setting", (err, data) => {
//         if (data != null) {
//             console.log(data.toString());
//         }
//     });
//     callsqlfun(lat1,lat2);
    
//     function callsqlfun(val1,val2)
//     {
//         const starttime = Date.now();
//         var lL = val1;
//         var uL = val2;
//         var newobj = {};
//         var sql = `Select locationSource,place,time,mag from dbo.quakes1 where latitude between ${lL} and ${uL}`;
//         var label = val1 + "," + val2;
//         if(i==timenew)
//         {
//             res.json(result);
//         }
//         else
//         {
//             client.get(label, (err, data) => {

//                 if (err || data == null) {
//                     console.log(data);
//                 }
//                 if (data != null){
//                     var op = JSON.parse(data.toString());
//                     newobj["random"] = op.random;
//                     newobj["timeTaken"] = Date.now() - starttime;
//                     newobj["count"] = op.count;
//                     newobj["dbUsed"] = "Redis";
//                     result.push(newobj);
//                     var val1 = (random.float(min = Number(lat1),max = Number(lat2))).toFixed(1);
//                     var val2 = (random.float(min = Number(val1),max = Number(lat2))).toFixed(1);
//                     callsqlfun(val1,val2);
//                 } 
//                 else {
//                     const call = new Request(sql,(err, rowCount, rows) => {
//                         if (err) {
//                             console.error(err.message);
//                         } 
//                         else {
//                             newobj["count"] = rowCount;
//                             newobj["random"] = lL + "  and  " + uL;
//                             newobj["timeTaken"] = Date.now() - starttime;
//                             newobj["dbUsed"] = "DB";
//                             //newobj["data"] = rows;
//                             result.push(newobj);
//                             client.set(label, JSON.stringify(newobj));
                            
//                             //
//                             console.log(result);
//                         }
//                     });
//                     call.on('requestCompleted', function () { 
//                         i++;
//                         var val1 = (random.float(min = Number(lat1),max = Number(lat2))).toFixed(1);
//                         var val2 = (random.float(min = Number(val1),max = Number(lat2))).toFixed(1);
//                     callsqlfun(val1,val2);
//                     });
//                     conn.execSql(call);
//                 }
//             });
        
//     } 
//     }
//    });

// module.exports = Router;