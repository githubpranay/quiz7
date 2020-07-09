//photo appendData
//normal form2html

////////////////////get before and after word//////////////
function getBeforeAfter() {
  console.log("ProximityTwowords");
   var a1 = document.forms["search_sen_form"]["getSenId"].value;
  // var a3 = document.forms["form1"]["a3"].value;
    fetch('/show_before_after', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({Input1: a1})
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

////////////////////search word and get sentance//////////////
function getSentanceForm() {
  console.log("ProximityTwowords");
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
  console.log("enter_sentence_disp");
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
        // console.log("correct",Inputarray[i], backendData[j].name);
        var div = document.createElement("div");
        div.style.padding = '20px';
        div.style.color = 'green';
        div.innerHTML = backendData[j].name;
        mainContainer.appendChild(div); 
      }
      if(!found && backendData.length == j+1){
        // console.log("incorrect",Inputarray[i], backendData[j].name);
        
        var div1 = document.createElement("div");
        div1.style.padding = '20px';
        div.style.color = 'red';
        div1.innerHTML =Inputarray[i].name;
        mainContainer1.appendChild(div1); 
      }
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
  // var a2 = document.forms["form1"]["a2"].value;
  // var a3 = document.forms["form1"]["a3"].value;
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


////////////////////without input data in file search//////////////
function search_name() {
  console.log("search_name");
  // var a1 = document.forms["form1"]["a1"].value;
  // var a2 = document.forms["form1"]["a2"].value;
  // var a3 = document.forms["form1"]["a3"].value;
    fetch('/get_data', 
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      //body: JSON.stringify({a1: a1})
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

////////////////////without input each word frequency//////////////
function freq_file() {
  console.log("freq_file");
  // var a1 = document.forms["form1"]["a1"].value;
  // var a2 = document.forms["form1"]["a2"].value;
  // var a3 = document.forms["form1"]["a3"].value;
    fetch('/frequent', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      //body: JSON.stringify({a1: a1})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      form2html(data,headers);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); 
    return false;
}




  //*******************Form2 Function ********************************
  function form2f() {
    console.log("form2");
    var a1 = document.forms["form2"]["a1"].value;
    var a2 = document.forms["form2"]["a2"].value;
    // var a3 = document.forms["form1"]["a3"].value;
    if (a1 == "" || a2 == "") {
      alert("Fields must be filled");
      return false;
    }
    else{
      fetch('/form2', 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({a1: a1,a2:a2})
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
  }

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

  //display pictures for names and creating div
function appendData(data) {
  document.getElementById("myData").innerHTML = "";
  document.getElementById("output_div").innerHTML = "";
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.style.padding = '20px';
    var img = document.createElement('img'); 
    var img_url = "/img/" + data[i].name+".jpg";
    img.src =  img_url;
    img.style.height = '100px';
    img.style.width = '100px';
         div.innerHTML =  "Name is " +data[i].name + "  "+"count is " +data[i].count + "  ";
         div.appendChild(img);
    mainContainer.appendChild(div);
  }
}