var APIKey = "941dad2ef4db62715bce15a03b87f504";

let addedButtons = document.querySelector("#search-history");
let searchList = [];
let addedCities = [];
let fiveDayCards = document.querySelector("#five-day")
let userCity = document.getElementById("nameText");

let mainCity = document.querySelector(".main-city");
let mainDate = document.querySelector(".main-date");
let mainIcon = document.querySelector("#main-icon");
let mainTemp = document.querySelector(".main-temp");
let mainHumidity = document.querySelector(".main-humidity");
let mainWindSpeed = document.querySelector(".main-wind-speed");
let mainUV = document.querySelector(".main-uv");

let names = [];
let submitButton = document.querySelector("#submitButton");


function getApi() {
  event.preventDefault();
  console.log(userCity);
  let cityName = userCity.value.trim();
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;
  searchList.push(cityName);
  localStorage.setItem("search-history", JSON.stringify(searchList));
  
  // To fetch after list button is clicked
  addedButtons.addEventListener('click', function (event){
    if (event.target.classList.contains('newButton')) {
      userCity = event.target.textContent;
      console.log("city is" + userCity)

      fetch(queryURL).then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (data) {
        console.log('Fetch Response \n-------------');
        console.log(data);
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let fetchIcon = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
        let fetchUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        
        mainCity.innerHTML = userCity.value;
        mainDate.textContent = moment().format("MM/DD/YYYY");
        mainIcon.src = fetchIcon;
        mainTemp.innerHTML = data.main.temp;
        mainHumidity.innerHTML = data.main.humidity;
        mainWindSpeed.innerHTML = data.wind.speed;
        
        fetch(fetchUV).then(function(response){
            return response.json()
          })
          .then(function(data){
            mainUV.innerHTML = "uv" + data.current.uvi
            if (data.current.uvi <= 2) {
              mainUV.setAttribute("class","m-1 p-1 border")
              mainUV.setAttribute("style","background-color: green")
          } else if (uvi > 2 && uvi <= 5) {
              mainUV.setAttribute("class","m-1 p-1 border")
              mainUV.setAttribute("style","background-color: yellow")
          } else if (uvi > 5 && uvi <= 8) {
              mainUV.setAttribute("class","m-1 p-1 border")
              mainUV.setAttribute("style","background-color: orange")
          } else {
              mainUV.setAttribute("class","m-1 p-1 border")
              mainUV.setAttribute("style","background-color: red")
          }
      })
    })
  }
})

  // Regular fetch
  fetch(queryURL).then(function (response) {
    console.log('response here')
    console.log(response)
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    let fetchIcon = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
    let fetchUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";

    mainCity.innerHTML = userCity.value;
    mainDate.textContent = moment().format("MM/DD/YYYY");
    mainIcon.src = fetchIcon;
    mainTemp.innerHTML = "Temperature: " + data.main.temp + '&deg;C';
    mainHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
    mainWindSpeed.innerHTML = "Wind Speed: " + data.wind.speed + "mph";
    

    fetch(fetchUV).then(function(response){
        return response.json()
       
      })
      .then(function(data){
        mainUV.innerHTML = "UVI: " + data.current.uvi;
        if (data.current.uvi <= 2) {
          mainUV.setAttribute("class","m-1 p-1")
          mainUV.setAttribute("style","background-color: green")
      } else if (uvi > 2 && uvi <= 5) {
          mainUV.setAttribute("class","m-1 p-1")
          mainUV.setAttribute("style","background-color: yellow")
      } else if (uvi > 5 && uvi <= 8) {
          mainUV.setAttribute("class","m-1 p-1")
          mainUV.setAttribute("style","background-color: orange")
      } else {
          mainUV.setAttribute("class","m-1 p-1")
          mainUV.setAttribute("style","background-color: red")
      };

      fiveDayCards.innerHTML = "";    

      for (let i = 0; i < 5; i++){
        let fiveDayIcon = 'https://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png';
        let fiveDayDate = moment().add(i + 1, "days").format("MM/DD/YYYY");
        let fiveDayTemp = data.daily[i].temp.day;
        let fiveDayWindSpeed = data.daily[i].wind_speed;
        let fiveDayHumidity = data.daily[i].humidity;

        let cardContent = 
            '<div class = "card bg-primary text-light" style="width: 15rem">' +
                '<p class = "card-header">' + fiveDayDate + '</h5>' +
                '<img clas = card-body src=' + fiveDayIcon + '></img>' + 
                '<p class = "card-body">Temperature: ' + fiveDayTemp + '&deg;C</p>' +
                '<p class = "card-body">Wind Speed: ' + fiveDayWindSpeed + 'm/s</p>' +
                '<p class = "card-body">Humidity: ' + fiveDayHumidity + '%</p>' +
            '</div>'
        fiveDayCards.innerHTML = fiveDayCards.innerHTML + cardContent;
      }
    })
  })
};

function addCityHistory(){
  // event.preventDefault();
  let searchedCities = JSON.parse(localStorage.getItem("search-history"))
 
  for (let i = 0; i < searchList.length; i++) {
      if (!addedCities.includes(searchList[i])) {
          let newCityButton = document.createElement("button");
          newCityButton.setAttribute("class", "newButton btn");
          newCityButton.dataset.cityName = searchedCities[i];
          newCityButton.textContent = searchedCities[i];
          addedButtons.append(newCityButton);
          addedCities.push(searchList[i]);
          console.log("addcitytest")
      }
  }
}

function sumbitRequest(){
  event.preventDefault();
  getApi();
  addCityHistory();
}
submitButton.addEventListener('click', sumbitRequest);


// to be used to store local data
// function init() {
//     var storedNames = JSON.parse(localStorage.getItem("names"));
    
//     if (storedNames !==null){
//       names = storedNames;
//     }
// }

// init();