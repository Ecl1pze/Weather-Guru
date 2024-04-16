async function fetchGetWeather() {
  const widgetCity = document.querySelector('.widget__city');
  const widgetStatus = document.querySelector('.widget__status');
  const widgetImage = document.querySelector('.widget__image');
  const widgetDeg = document.querySelector('.widget__deg');
  const widgetWind = document.querySelector('.widget__wind');
  const widgetHumt = document.querySelector('.widget__humt');

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5fd15741cc4f38ed595357b0f1d5a4c5&units=metric&lang=ru`
    );
    const data = await response.json();

    widgetStatus.textContent = data.weather[0].description;
    widgetImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    widgetCity.textContent = data.name;
    widgetDeg.innerHTML = `${data.main.temp.toFixed()}&#186;`;
    widgetWind.innerHTML = `
    <img src="images/wind-icon.svg" alt="Скорость ветра"/>
    ${data.wind.speed} м/с
    `;
    widgetHumt.innerHTML = `
    <img src="images/humt-icon.svg" alt="Влажность"/>
    ${data.main.humidity}%`;
  });
}

document.addEventListener('DOMContentLoaded', fetchGetWeather);
