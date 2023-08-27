import React from "react";
import {useEffect, useState} from "react";
import { Container } from "@mui/material";
import Fechas from './Fechas' 


const urlApi = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const urlApi2 = `&cnt=5&appid=55fed173dbbbae45d6acd4f1a920d2f1&units=metric`; //imperial


function HistoryWheathe(props,) {
  const [hweather, setHweather] = useState({
    fecha: "",
    temperatura: "",
  })

  const onSubmit = async (e) => {
    if (props.submit && props.city ) {
      const response = await fetch(`${urlApi}${props.city}${urlApi2}`);
      const data = await response.json();
       console.log(data);
      setHweather({
        fecha: data.list[0].dt_txt,
      });
      props.setSubmit(false)} 
      else {
        const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=bogota&cnt=5&appid=55fed173dbbbae45d6acd4f1a920d2f1&units=metric");
      const data = await response.json();
       console.log(data);
      setHweather({
        fecha: data.list[0].dt_txt,
        temperatura: data.list[0].main.temp,
      }); 
      }
  };

  useEffect(() => { 
    console.log('props.city:', props.city);
    console.log('props.submit:', props.submit);
    if (props.city) {
      onSubmit();
    }
  }, [props.submit, props.city]);
  
  return (
    <Container className="ct">
    {<Fechas 
    fecha={hweather.fecha}
    />}
    <h3>{hweather.temperatura}°C</h3>
  </Container>
  )
  
}

export default HistoryWheathe;
