import React from "react";
import {useEffect, useState} from "react";
import { Container } from "@mui/material";

const urlApi = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const urlApi2 = `&cnt=5&appid=55fed173dbbbae45d6acd4f1a920d2f1&units=metric`; //imperial


function HistoryWheathe(props,) {
  console.log(props.submit)
  const [hweather, setHweather] = useState({
    lista: "",
  })
  const onSubmit = async (e) => {
    if (props.submit) {
      const response = await fetch(`${urlApi}${props.city}${urlApi2}`);
      const data = await response.json();
       console.log(data);
      setHweather({
        lista: data.list[0].dt_txt,
        temp:
      }); 
      props.setSubmit(false)
  }};
  
  useEffect(() => {
    onSubmit();
  }, [props.submit]);

  return (
    <Container className="ct">
    <h1>{hweather.lista}</h1>
  </Container>
  )
  
}

export default HistoryWheathe;
