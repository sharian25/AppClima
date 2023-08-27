import React from "react";
import { useState, useEffect } from "react";
import { Container, Typography, Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import HistoryWheathe from "./HistoryWheathe";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
/* import Iconos from './Iconos' */

const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=`;
const urlApi2 = `&appid=55fed173dbbbae45d6acd4f1a920d2f1&units=metric`;

function PlaceWheather(props) {
  const [city, setCity] = useState("Bogota"); // estado de de las ciudades en el formuraio inica con Bogotá
  const [loading, setLoading] = useState(false); // estado que muestra el mensaje del boton al darle click
  const [submit, setSubmit] = useState(true); //Captura el nuevo Valor de City
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    onSubmit();
  }, []); // Se ejecuta solo cuando el componente se monta

  const [weather, setWeather] = useState({
    //estado que muestra los resultados del API
    city: "",
    country: "",
    temp: "",
    conditión: "",
    description: "",
  });

  const onSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmit(!submit);
    setLoading(true);
    setError({
      error: false,
      menssage: "",
    });
    try {
      if (!city.trim()) throw { message: "Este Campo es Obligatorio" };
      const response = await fetch(`${urlApi}${city}${urlApi2}`); //Consume los datos del Api y a
      const data = await response.json(); //promesa devuelta por el fetch

      if (data.error) throw { message: data.error.menssage }; //gatilla el cath y vuelva a mostrar el mensaje
      //si es correcto nos devolverá el objeto desde el estado y cargamos los valores
      setWeather({
        city: data.name,
        temp: data.main.temp,

        description: data.weather[0].description,
        country: data.sys.country,
        /*   
          
          conditión: data.main,
          ,
           */
      });
    } catch (error) {
      setError({
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="container" maxWidth="xs" sx={{ mt: 2 }}>
      {/* <Typography variant="h3" component="h1" align="center" gutterBottom>
        Wheather app
      </Typography> */}
      <Box
        sx={{ display: "flex", gap: 2}}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
        sx={{mt:3}}
          id="city"
          variant="outlined"
          size="small"
          required
          placeholder="Search for places"
          value={city} // valor de la ciudad buscada
          onChange={(e) => setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
        />

        <LoadingButton
        sx={{mt:3}}
          type="submit"
          variant="contained"
          loading={loading} //estado del cambio de mensaje sea true o false
          loadingIndicator="Buscando Ciudad"
        >
          Buscar
        </LoadingButton>
        <GpsFixedIcon className="Gps" />
      </Box>
      {weather.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img className="img" src={props.icono1} alt={weather.description} />
            <Typography variant="h2" component="h3" color="#E7E7EB">
              {weather.temp} °C
            </Typography>
            <Typography variant="h4" component="h5" color="#A09FB1">
              {weather.description}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            component="h2"
            color="#88869D"
            fontSize="18px"
          >
            <LocationOnIcon /> {weather.city}
          </Typography>
        </Box>
      )}

      <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
        Powered by:{" "}
        <a
          href="https://api.openweathermap.org/"
          title="Weather API"
          target="_blank"
        >
          WeatherAPI.com
        </a>
      </Typography>

      <HistoryWheathe
        city={weather.city}
        submit={submit}
        setSubmit={setSubmit}
      />

      {/* <Iconos
      
      /> */}
    </Box>
  );
}

export default PlaceWheather;
