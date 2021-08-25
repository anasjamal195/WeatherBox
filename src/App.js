import './App.css';
import React, { useState } from 'react';





function App() {
  const [bg] = useState('bg bg' +(Math.floor(Math.random()*5)+1));
  
  /*const api = {
    key: '3dd7824a049a021a9d9f12888b3fd4ce',
    base: 'https://api.openweathermap.org/data/2.5'
  }*/
  let d = new Date();
  let daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [weather, setWeather] = useState({});
  const [querry, setQuerry] = useState('');
  const [enterPressed, setenterPressed] = useState(0);
  const weatherHandler = (querry) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?units=metric&&q=' + querry + '&appid=3dd7824a049a021a9d9f12888b3fd4ce')
      .then(response => response.json())
      .then(data => setWeather(data));
    setQuerry('');
    
  }



  let newTime = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(newTime);
  const UdateTime = () => {
    let newCTime = new Date().toLocaleTimeString();
    setCtime(newCTime);
  };
  setInterval(UdateTime, 1000);

 
  return (
    <div className={bg}>
      <div className = "App">
        <div className = 'startScreen'></div>
      <div className="container ">


        <div className="row ">
          <div className="col-md-3 d-flex ">
            <div className='container dateTime my-5 d-flex flex-column justify-content-center'>
              <div className=' time'>{ctime}</div>
              <div className=' date'>{d.getDay()}/{d.getMonth()}/{d.getFullYear()}</div>
            </div>
          </div>
          <div className="col-md-6  ">

            <div className="container my-3">
              <input
                className="form-control  text-light search"
                onChange = {(e)=>{setQuerry(e.target.value)}}
                value = {querry}
                placeholder='Search...'
                onKeyPress={(e) => {
                  if (e.code === 'Enter' && querry !== '') {
                  

                    setenterPressed(1);
                  weatherHandler(querry);   
                  
                }
                }
                }>


              </input>
            </div>
                {Object.entries(weather).length !== 0 &&  weather.weather?
                

                
            
            <div className="weather container d-flex  justify-content-center flex-column ">
              <div className="container weatherHolder d-flex flex-column justify-content-center">
                <div className="container-fluid my-1 py-3 location">
                  {weather.name},{weather.sys.country}
                  <div className="container-fluid day">{daysInWeek[d.getDay()]}</div>
                </div>


                <div className="container-fluid my-5 temp">
                  <div className="container-fluid  weatherCondition">
                  {weather.weather[0].main}
                  <img alt = "icon" src = {'http://openweathermap.org/img/w/'+weather.weather[0].icon+'.png'}/><br/>
                  <p>{weather.weather[0].description}</p></div>
                  <b>{Math.round(weather.main.temp)} &#xb0;C</b>  
                </div>
                <div className ="row">
                    <div className = "col">Feels like: {Math.round(weather.main.feels_like)}&#xb0;C</div>
                    <div className = "col">Min temp: {Math.round(weather.main.temp_min)}&#xb0;C</div>
                  </div>
              </div>
            </div>
            : <div className = 'container text-danger'>{enterPressed === 0?'':'No results'}</div>
            }


          </div>
          {Object.entries(weather).length !== 0 && weather.weather?
          
          <div className="col-md-3 d-flex align-items-center" >
            <div className="container weatherDetail d-flex flex-column justify-content-center">
              <div className="container-fluid my-4">Lon: {weather.coord.lon}&#xb0;</div>
              <div className="container-fluid my-4">Lat: {weather.coord.lat}&#xb0;</div>
              <div className="container-fluid my-4">Visibility: {weather.visibility}m</div>
              <div className="container-fluid my-4">Wind speed: {weather.wind.speed} ms<sup>-1</sup></div>

            </div>
          </div>
          
          :''}
        </div>
      </div>
      </div>










    </div>
  );
}

export default App;
