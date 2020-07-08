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
      //var headers = ["name","count","result"];
      //showTableData(data,headers);
      appendData(data);
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
      //var headers = ["name","count","result"];
      //showTableData(data,headers);
      appendData(data);
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
    fetch('/most_frequent', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      //body: JSON.stringify({a1: a1})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      var headers = ["name","total"];
      showTableData(data,headers);
      // appendData(data);
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

  ///////////////////////////////////DISPLAY DATA IN TABLES/////////////////////////////////////
function showTableData(data,headers) {
  document.getElementById("myData").innerHTML = "";
  document.getElementById("output_div").innerHTML = "";
  var mainContainer = document.getElementById("output_div");
  //added to display time taken
  var div = document.createElement("div");
  div.style.padding = '20px';
  mainContainer.appendChild(div)
  var outputHTML = "";
  outputHTML += "<table>";
  outputHTML += "<tr>";
  for(var i=0;i<headers.length;i++){
    outputHTML += "<th>" + headers[i]  + "</th>";
  }
  outputHTML += "</tr>";
  for (var i = 0; i < data.length; i++) {
          outputHTML += "<tr>";
          for(var j=0;j<headers.length;j++){
              outputHTML += "<td>" + data[i][headers[j]] +  "</td>";
          }
          outputHTML += "</tr>";
      
  }
  outputHTML += "</table>";
  // output our html
  document.getElementById("output_div").innerHTML = outputHTML;
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
         div.innerHTML =  "Name is " +data[i].name + "  ";
         div.appendChild(img);
    mainContainer.appendChild(div);
  }
}