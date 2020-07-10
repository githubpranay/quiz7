// var btn = document.createElement("BUTTON");
//   btn.innerHTML = "CLICK ME";
//   document.body.appendChild(btn);//photo appendData
//normal form2html


////////////////////search word and get sentance//////////////
function getSentanceForm() {
  console.log("These are the Results");
   var a1 = document.forms["search_sen_form"]["getSenId"].value;
  // var a3 = document.forms["form1"]["a3"].value;
    fetch('/get_Sentance', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({Input1: a1})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // form2html(data);
      enter_sentence_disp(data,a1);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
}

function enter_sentence_disp(backendData,a1) {
  console.log("entered_sentence_disp");
  var Inputarray = a1.toString().split(/\s+/);
  var mainContainer = document.getElementById("myData");
  var mainContainer1 = document.getElementById("myDataNo");
  var i, j;
  for(i=0;i<Inputarray.length;i++)
  {
    var found = false;
    for(j=0;j<backendData.length;j++)
    {
      // console.log("incorrect1",backendData.length, j+1);
      if(Inputarray[i] == backendData[j].name)
      {
        found = true;
        var div = document.createElement("div");
        div.style.padding = '50px';
        // div.style.t = "Not in English:" ;
        div.style.color = 'green';
        div.innerHTML = "English :"+ backendData[j].name;
        mainContainer.appendChild(div); 
        console.log("correct",Inputarray[i], backendData[j].name);
      } else {
        if(backendData.length == j+1){
          console.log("incorrect",j+1, backendData.length);
          
          var div1 = document.createElement("div");
          // div.style.text = "Not in English:" ;
          div1.style.padding = '30px';
          div1.style.color = 'red';
          div1.innerHTML = "Not in English text file:" +Inputarray[i];
          mainContainer1.appendChild(div1); 
          // mainContainer1.value = Inputarray[i];
          document.forms["search_sen_form1"]["getSenId1"].value = Inputarray[i]
        }
      }
      if(found) {
        break;
      }
      // console.log("found"+found)
      
    }
  }

}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


function getSentanceForm1() {
  console.log("These are the Results which are in RED");
  var a2 = document.forms["search_sen_form1"]["getSenId1"].value;

  // var a3 = document.forms["form1"]["a3"].value;
    fetch('/get_Sentance1', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({Input2: a2})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      
      enter_sentence_disp1(data,a2);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
}


function enter_sentence_disp1(backendData,a2) {
  console.log("entered_sentence_disp");
  var Inputarray = a2.toString().split(/\s+/);
  var div3 = document.createElement("div");
  var div4 = document.createElement("div");
  var mainContainer2 = document.getElementById("myData2");
  var mainContainer3 = document.getElementById("myDataNo3");
  var mainContainer4 = document.getElementById("myDataNo4");
  var mainContainer5 = document.getElementById("myDataNo5");
  var i, j;
  for(i=0;i<Inputarray.length;i++)
  {
    var found = false;
    for(j=0;j<backendData.length;j++)
    {
      // console.log("incorrect1",backendData.length, j+1);
      if(Inputarray[i] == backendData[j].name)
      {
        found = true;
        var div = document.createElement("div");
        var div3 = document.createElement("div");
        var div4 = document.createElement("div");
        var arry = backendData[j].line[0].toString().split(/\s+/);
        var arry_1 = backendData[j].line[1].toString().split(/\s+/);
        // var arry_2 = backendData[j].line[2].toString().split(/\s+/);
        div.style.padding = '50px';
        div.style.color = 'green';
        div3.style.padding = '50px';
        div3.style.color = 'green';
        div4.style.padding = '50px';
        div4.style.color = 'green';
       
        div.innerHTML = "The spanish equivalent to english for word "+arry[0]+ " is " + arry[1];
        div3.innerHTML = "The spanish equivalent to english for word "+arry_1[0]+ " is " + arry_1[1];
        // div4.innerHTML = "The spanish equivalent to english for word "+arry_2[0]+ " is " + arry_2[1];
        mainContainer2.appendChild(div); 
        mainContainer4.appendChild(div3)
        mainContainer5.appendChild(div4)
        console.log("correct",Inputarray[i], backendData);
      } else {
        if(backendData.length == j+1){
          console.log("incorrect",j+1, backendData.length);
          
          var div1 = document.createElement("div");
          // div.style.text = "Not in English:" ;
          div1.style.padding = '50px';
          div1.style.color = 'red';
          div1.innerHTML = "Not in Spanish text file for " +Inputarray[i];
          mainContainer3.appendChild(div1); 

        }
      }
      if(found) {
        break;
      }
      // console.log("found"+found)
      
    }
  }

}




////////////////////proximity between two words//////////////
function ProximityTwowords() {
  console.log("ProximityTwowords");
   var a1 = document.forms["form3Proximity"]["name1_proxy"].value;
   var a2 = document.forms["form3Proximity"]["name2_proxy"].value;
  // var a3 = document.forms["form1"]["a3"].value;
    fetch('/proximity_search', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({Input1: a1,Input2:a2})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      form2html(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
}

////////////////////with input data in file search//////////////
function search_name_inp() {
  console.log("search_name_inp");
   var a1 = document.forms["getSearch_inp"]["Search_a1"].value;
  
    fetch('/get_data_inp', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({Input: a1})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      form2html(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
}




  //*******************Form2 Function ********************************

  function form2html(data) {
    document.getElementById("myData").innerHTML = "";
    document.getElementById("output_div").innerHTML = "";
        var mainContainer = document.getElementById("myData");
        for (var i = 0; i < data.length; i++) {
            var div = document.createElement("div");
            div.style.padding = '20px';
            div.innerHTML = (i+1)+". Country Name = "+ data[i].Entity.value +"; Year = "+ data[i].Year.value+"; Smokers = "+ data[i].Smokers.value;
            mainContainer.appendChild(div); 
        }
  }


  