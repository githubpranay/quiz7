const express = require("express");
const Router = express.Router();
const conn = require("./connection");

//added for file
var fs = require('fs');
var findInFiles = require('find-in-files');
//added for file
//const lodash = require("lodash");
//random value generation
//const random = require('random');


var path = require("path");
const{Connection,Request}=require("tedious");

Router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname+'/../../index.html'));
})

const superagent = require('superagent');
const { response } = require("express");


///------------------------------------search wode in doc(input)-------------------------------
// https://www.npmjs.com/package/find-in-files
Router.post("/get_data_inp", (req,resp)=>{ 
  var inputName = req.body.Input;
  console.log(inputName);
  var out = [];
    findInFiles.findSync(inputName, '.', 'PrideandPrejudice.txt')
      .then(function(results) {
        //   console.log("results = ", results)
          for (var result in results) {
              var new_obj ={};
              var res = results[result];
              new_obj["name"]=res.matches[0];
              new_obj["count"]=res.count;
              new_obj["result"]=result;
              out.push(new_obj);
              console.log('found "' + res.matches[0] + '" ' + res.count+ ' times in "' + result + '"');     
          }
            resp.send(out);
      });
    
    });
    


///------------------------------------search wode in doc-------------------------------
// https://www.npmjs.com/package/find-in-files
// fs.readFile('/AAESH_CLASSES/SUMMER2020/AdvanceDB/Assignment_6/KOWSHIK_SOLUTION/public/img', 'utf8', function (err,data) {
Router.get("/get_data", (req,resp)=>{ 
var out =[];
var array = fs.readFileSync(__dirname+'/../img/names.txt').toString().split(/\s+/);
var a = 0;
for(var i=0;i<array.length;i++)
{
    var inputName = String(array[i]);
    // if(i==array.length-1){
    //     var inputName = String(array[i].substring(0,array[i].length));
    // }
    // else{
    //     var inputName = String(array[i].substring(0,array[i].length-1));
    // }
//   findInFiles.find("[E,e]lizabeth", '.', '.txt$')
findInFiles.findSync(inputName, '.', 'PrideandPrejudice.txt')
  .then(function(results) {
    //   console.log("results = ", results)
      for (var result in results) {
          var new_obj ={};
          var res = results[result];
          new_obj["name"]=res.matches[0];
          new_obj["count"]=res.count;
          new_obj["result"]=result;
          out.push(new_obj);
          console.log('found "' + res.matches[0] + '" ' + res.count+ ' times in "' + result + '"');     
      }
      a++;
      if(a==array.length){
        resp.send(out);
      }
  });
}
});


//code to count each word in a file
Router.post("/frequent", (req,resp)=>{ 
    // read file from current directory
    fs.readFile(__dirname+'/../img/NumberOfTimes.txt', 'utf8', function (err, data) {
      if (err) throw err;
      var wordsArray = splitByWords(data);
      var wordsMap = createWordMap(wordsArray);
      var finalWordsArray = sortByCount(wordsMap);
    
      console.log(finalWordsArray);
      console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
        finalWordsArray[0].total + ' times');
        resp.json(finalWordsArray);
    });
    
    function splitByWords (text) {
      // split string by spaces (including spaces, tabs, and newlines)
      var wordsArray = text.split(/\s+/);
      return wordsArray;
    }
    
    function createWordMap (wordsArray) {
      // create map for word counts
      var wordsMap = {};
      wordsArray.forEach(function (key) {
        if (wordsMap.hasOwnProperty(key)) {
          wordsMap[key]++;
        } else {
          wordsMap[key] = 1;
        }
      });
      return wordsMap;
    }
    
    function sortByCount (wordsMap) {
      // sort by count in descending order
      var finalWordsArray = [];
      finalWordsArray = Object.keys(wordsMap).map(function(key) {
        return {
          name: key,
          total: wordsMap[key]
        };
      });
    
      finalWordsArray.sort(function(a, b) {
        return b.total - a.total;
      });
      return finalWordsArray;
    }
    });

// ----------------------------------------------Form2-------------------------------------------------
Router.post("/form2", (req,res)=>{
    var year1 = req.body.a1;
    var year2 = req.body.a2;
    // var countryCode = req.body.a3;

    
    var sql=`select * from s where year between '${year1}' and '${year2}';`;
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


module.exports = Router;