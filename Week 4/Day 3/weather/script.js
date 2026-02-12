let cityName = "indore";
const API_KEY = "f6b3a859ee0ee928c1ced8c0c7786f1a";

const btn = document.querySelector('#btn');

async function  getData (city){
    try{
        const res = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await res.json();

        if(res.ok){
            setWeatherData(data);
        }else{
            alert("city not found")
        }

    }catch(error){
        console.log("Error fetching data ",error);
    }
}

function setWeatherData(weatherData){
    const temp = document.querySelector('.temp')
    const city = document.querySelector('.city')
    const pressure = document.querySelector('.pressure')
    const humidity = document.querySelector('.humidity')
    temp.innerText = `temp : ${weatherData.main.temp} °C`
    city.innerText = `${weatherData.name}`
    pressure.innerText = `pressure : ${weatherData.main.pressure} `
    humidity.innerText = `humidity : ${weatherData.main.humidity}`
}
const handleSearch = (e)=>{
    e.preventDefault();
    let city = e.target.search.value;   
       if (city.trim() !== "") {
        getData(city);
    }
}


getData(cityName);