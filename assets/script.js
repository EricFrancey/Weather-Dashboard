
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var APIKey = "941dad2ef4db62715bce15a03b87f504";

let userCity = document.querySelector("#nameText");

let text = document.querySelector(".text");

let names = [];
let nameList = document.querySelector("#name-list");


// get api
var submitButton = document.querySelector("#submitButton");

function getApi() {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIKey;

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
    
  });

//   text.textContent = userCity;
//   text.textContent = "hi";
//   text.innerHTML = "Hi";

  //text.textContent = data.main.temp;
//   submitButton.setAttribute ("style", "display: none")

}

submitButton.addEventListener('click', getApi);




////////////////////////////////
///storage of city list

function init() {

    var storedNames = JSON.parse(localStorage.getItem("names"));
    
    if (storedNames !==null){
      names = storedNames;
    }
    renderhiScores()
}




    function renderhiScores() {

        // nameList.innerHTML = "Hi";
        
        for (var i = 0; i < names.length; i++) {
        
          var name = names[i]
          var li = document.createElement("li");
        
          li.textContent = name;
          li.setAttribute("data-index", i);
          nameList.appendChild(li);
            }
        }




    function storeNames() {

        localStorage.setItem("names", JSON.stringify(names));
      }
      
        submitButton.addEventListener("click", function(event) {
        event.preventDefault();
      
        // var nameText = nameInput.value.trim();
        var nameText = userCity.value.trim();
        console.log(nameInput);
      
        if (nameText === "") {
          return;
        }
      
        names.push(nameText);
        // nameInput.value = "";
        userCity.value = "";
      
        storeNames();
        renderhiScores();
      });
      
init();

