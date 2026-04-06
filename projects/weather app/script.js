document.addEventListener('DOMContentLoaded',() => {
    const CityInput = document.getElementById("city-input");
    const GetWeatherBtn = document.getElementById("get-weather-btn");
    const CityNameDisplay = document.getElementById("city-name");
    const WeatherInfo = document.getElementById("weather-info");
    const temperatur = document.getElementById("temperature");
    const aqi = document.getElementById("aqi");
    const description = document.getElementById("description");
    const ErrorMess = document.getElementById("error-message");
    const key_Value = "283d5ca8c5fd4bffa96153923260304";

    GetWeatherBtn.addEventListener('click',async () =>{
        const  CityName = CityInput.value.trim()
        if(!CityName) return ;
        try {
          const WeatherData =   await GetWeatherInfo(CityName)
          WeatherDisplay(WeatherData)
        } catch (e) {
                ErrorHandling()
        }
        
    })
    async function GetWeatherInfo (CityName){
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${key_Value}&q=${CityName}&days=1&aqi=yes&alerts=no`;
        const response = await  fetch(url);
        if(!response.ok){
            throw new Error("city nor found ")
        }
        const data = await response.json();
        console.log(data);
        return data

    }
    function WeatherDisplay (data){

        CityNameDisplay.innerText = `City : ${data.location.name}`;
        temperatur.innerText = `Temprature : ${data.current.temp_c}`;

        // const (location, current )
        let pm25 = data.current.air_quality.pm2_5;
        let category = "";

        if (pm25 <= 12) {
          category = "Good (0–50)";
        } else if (pm25 <= 35.4) {
          category = "Moderate (51–100)";
        } else if (pm25 <= 55.4) {
          category = "Unhealthy for Sensitive Groups (101–150)";
        } else if (pm25 <= 150.4) {
          category = "Unhealthy (151–200)";
        } else if (pm25 <= 250.4) {
          category = "Very Unhealthy (201–300)";
        } else {
          category = "Hazardous (301–500)";
        }

        aqi.innerHTML =
        `AQI : PM2.5: ${pm25} µg/m³ → AQI Category: <strong>${category}</strong>`;
        description.innerHTML = `Tommorrow Sunrise timing : <strong> ${data.forecast.forecastday[0].astro.sunrise} </strong>`
        WeatherInfo.classList.remove('hidden')  
        ErrorMess.classList.add('hidden')      

    }



    function ErrorHandling(){
        WeatherInfo.classList.add('hidden')
        ErrorMess.classList.remove('hidden')
    }
})