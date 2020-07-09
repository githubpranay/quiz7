const express = require("express");
const Router = express.Router();
const conn = require("./connection");

//added for file
var fs = require('fs');
var findInFiles = require('find-in-files');
//added for file
const _ = require("lodash");
var stopword=require('stopword');
//random value generation
//const random = require('random');


var path = require("path");
const{Connection,Request}=require("tedious");

Router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname+'/../../index.html'));
})

const superagent = require('superagent');
const { response } = require("express");


///------------------------------------Proximity name search(input)-------------------------------
// https://www.npmjs.com/package/find-in-files
Router.post("/proximity_search", (req,resp)=>{ 
  var Name1 = req.body.Input1;
  var Name2 = req.body.Input2;
  console.log(Name1);
  var out = [];
    findInFiles.findSync(Name1, '.', 'PrideandPrejudice.txt')
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

// ---------------------------------------------Q1.Quiz 6

Router.post("/enterSentence", (req,resp)=>{ 
  var inp = req.body.Input;
  var out =[];
  var array = inp.toString().split(/\s+/);
  console.log(array);
  var a = 0;
  for(var i=0;i<array.length;i++)
  {
      var inputName = String(array[i]);

  findInFiles.findSync(inputName, '.', 'EnglishWordsMostFreq.txt')
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
    
  Router.post("/enterSentence1", (req,resp)=>{ 
    var inp = req.body.Input;
    var out =[];
    var array = inp.toString().split(/\s+/);
    console.log(array);
    var a = 0;
    for(var i=0;i<array.length;i++)
    {
        var inputName = String(array[i]);
  
    findInFiles.findSync(inputName, '.', 'SpanishEnglishFreq.txt')
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
// Router.post("/frequent", (req,resp)=>{ 
//     // read file from current directory
//     fs.readFile(__dirname+'/../img/NumberOfTimes.txt', 'utf8', function (err, data) {
//       if (err) throw err;
//       var wordsArray = splitByWords(data);
//       var wordsMap = createWordMap(wordsArray);
//       var finalWordsArray = sortByCount(wordsMap);
    
//       console.log(finalWordsArray);
//       console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
//         finalWordsArray[0].total + ' times');
//         resp.json(finalWordsArray);
//     });
    
//     function splitByWords (text) {
//       // split string by spaces (including spaces, tabs, and newlines)
//       var wordsArray = text.split(/\s+/);
//       return wordsArray;
//     }
    
//     function createWordMap (wordsArray) {
//       // create map for word counts
//       var wordsMap = {};
//       wordsArray.forEach(function (key) {
//         if (wordsMap.hasOwnProperty(key)) {
//           wordsMap[key]++;
//         } else {
//           wordsMap[key] = 1;
//         }
//       });
//       return wordsMap;
//     }
    
//     function sortByCount (wordsMap) {
//       // sort by count in descending order
//       var finalWordsArray = [];
//       finalWordsArray = Object.keys(wordsMap).map(function(key) {
//         return {
//           name: key,
//           total: wordsMap[key]
//         };
//       });
    
//       finalWordsArray.sort(function(a, b) {
//         return b.total - a.total;
//       });
//       return finalWordsArray;
//     }
//     });

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

/////////////////most frequent find in file and check in other file////////////////////
// Router.post("/frequent", (req,res)=>{ 
//   var arr;
//   var file = __dirname+'/../img/NumberOfTimes.txt';
   
//   // read file from current directory
//   fs.readFile(file, 'utf8', function (err, data) {
//     if (err) throw err;
//     var wordsArray = splitByWords(data);
//     var wordsMap = createWordMap(wordsArray);
//     var finalWordsArray = sortByCount(wordsMap);

//       var length;
//       if(finalWordsArray.length<20)
//       length=finalWordsArray.length;
//       else
//       length=20;
//       var array=[];
//       for(var i=0;i<length;i++){
//           array.push(finalWordsArray[i].name);
//       }
//       var output =[];
//       var a = 0;
//       for(var i=0;i<array.length;i++)
//       {
//           var names = String(array[i]);
//       findInFiles.findSync(names, '.', 'PrideandPrejudice.txt')
//         .then(function(results) {
//             for (var result in results) {
//                 var obj ={};
//                 var data = results[result];
//                 obj["name"]=data.matches[0];
//                 obj["count"]=data.count;
//                 output.push(obj);     
//             }
//             a++;
//             if(a==array.length){
//              var output1= _.sortBy(output, [function(o) { return o.count; }]).reverse();
//              console.log(output1);
//                  res.send(output1);
//             }
//         });
//       }
//   });
   
//   function splitByWords (text) {
//     // split string by spaces (including spaces, tabs, and newlines)
//     var wordsArray = text.split(/\s+/);
//     return wordsArray;
//   }
   
//   function createWordMap (wordsArray) {
//     // create map for word counts
//     var wordsMap = {};
//     wordsArray.forEach(function (key) {
//       if (wordsMap.hasOwnProperty(key)) {
//         wordsMap[key]++;
//       } else {
//         wordsMap[key] = 1;
//       }
//     });
//     return wordsMap;
//   }
   
//   function sortByCount (wordsMap) {
//     // sort by count in descending order
//     var finalWordsArray = [];
//     finalWordsArray = Object.keys(wordsMap).map(function(key) {
//       return {
//         name: key,
//         total: wordsMap[key]
//       };
//     });
   
//     finalWordsArray.sort(function(a, b) {
//       return b.total - a.total;
//     });
//     return finalWordsArray;
//   }
//   });


  ///////////////////////////////with stop words///////////////////////////
  Router.post("/frequent", (req,res)=>{ 
    var arr;
    var file = __dirname+'/../img/NumberOfTimes.txt';
     
    // read file from current directory
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) throw err;
      var wordsArray = splitByWords(data);
      var wordsMap = createWordMap(wordsArray);
      var finalWordsArray = sortByCount(wordsMap);
     
    //   console.log(finalWordsArray.name);
      console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
        finalWordsArray[0].total + ' times');


/******************* removing stop words*/
console.log('the final words array',finalWordsArray)
console.log('the final words array length',finalWordsArray.length)
var arrayWord=[];
for(var i=0;i<finalWordsArray.length;i++){
arrayWord.push(finalWordsArray[i].name);
}

console.log("the Array word",arrayWord);

var array = fs.readFileSync(__dirname+'/../img/stop.txt').toString().split(/\s+/);

var finalWordsArray = stopword.removeStopwords(arrayWord,array);
console.log('Data after stop words removed',finalWordsArray);
console.log('stop words',array);

/****** *******************/
        var length;
        if(finalWordsArray.length<20)
        length=finalWordsArray.length;
        else
        length=20;
        var array=[];
        for(var i=0;i<length;i++){
            // array.push(finalWordsArray[i].name);
            array.push(finalWordsArray[i]);
        }
        var output =[];
        var a = 0;
        // console.log('the 20 most frequent words',array);
        for(var i=0;i<array.length;i++)
        {
            var names = String(array[i]);
        findInFiles.findSync(names, '.', 'PrideandPrejudice.txt')
          .then(function(results) {
            //   console.log("results = ", results)
              for (var result in results) {
                  var obj ={};
                  var data = results[result];
                  obj["name"]=data.matches[0];
                  obj["count"]=data.count;
                //   obj["result"]=result;
                  output.push(obj);
                //   console.log('found "' + data.matches[0] + '" ' + data.count+ ' times in "' + result + '"');     
              }
              a++;
              if(a==array.length){
               var output1= _.sortBy(output, [function(o) { return o.count; }]);
                  console.log(output1);
                //   res.render('mostFrequentFromFile1', { data: output1 });
                // //   res.render('mostFrequentFromFile1', { data: output });
              }
          });
        }
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
  ////////////////////////////////////////////////////////////////////////
////////////////////////////////10. show all sentances that have this word//////////////////////////////////
  Router.post("/get_Sentance", (req, resp) => {
    var name = req.body.Input1;
    var array = fs.readFileSync(__dirname + '/../img/EnglishWordsMostFreq.txt').toString().split(".");
    var out =[];
    var array = name.toString().split(/\s+/);
    console.log(array);
    var a = 0;
    for(var i=0;i<array.length;i++)
    {
        var inputName = String(array[i]);
      
    findInFiles.findSync(inputName, '.', 'EnglishWordsMostFreq.txt')
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


    Router.post("/get_Sentance1", (req, resp) => {
      console.log("Here we are")
      var name = req.body.Input2;
      var array = fs.readFileSync(__dirname + '/../img/SpanishEnglishFreq.txt').toString().split(".");
      var out =[];
      var array = name.toString().split(/\s+/);
      console.log(array);
      var a = 0;
      for(var i=0;i<array.length;i++)
      {
          var inputName = String(array[i]);
        
      findInFiles.findSync(inputName, '.', 'SpanishEnglishFreq.txt')
        .then(function(results) {
          console.log("results = ", results)
            for (var result in results) {
                var new_obj ={};
                var res = results[result];
                new_obj["name"]=res.matches[0];
                new_obj["count"]=res.count;
                new_obj["line"] = res.line;
                new_obj["result"]=result;
                out.push(new_obj);
                console.log('found "' + res.matches[0] + '" ' + res.count+ ' times in "' + result + '"');  
                console.log("lines="+res.line);   
            }
            a++;
            if(a==array.length){
              resp.send(out);
            }
        });
      }
      });
   

   
////////////////////////////////7. Show word before that and after that//////////////////////////////////
   Router.get("/show_before_after", (req, resp) => {
    var stopWord = req.body.Input1;
    var array = fs.readFileSync(__dirname + '/../img/NumberOfTimes.txt').toString().split(".");
    var out =[];
    for(i in array) {
    if(array[i].includes(stopWord)){
    
    console.log("stopword: "+i+" : "+array[i]);
    var wordsArray = array[i].split(/\s+/);
    console.log(wordsArray);
    for(j in wordsArray){
    if(wordsArray[[j]].includes(stopWord)){
    var new_obj = {};
    console.log("word before: "+ wordsArray[j-1]);
    console.log("word after: "+ wordsArray[j++]);
    new_obj["before_word"] = wordsArray[j-1];
    new_obj["after_word"] = wordsArray[j+1];
    new_obj["stop_word"] = stopWord;
    out.push(new_obj);
    }
    }
    }
    }
    resp.send(out);
   })


module.exports = Router;