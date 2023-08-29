import React, { useState, useEffect } from 'react';
import {Container} from '@mui/material';

function FechaFormateada(props) {
  const [fecha, setFecha] = useState('');

 useEffect(() => {
  const fechaOriginal = `${props.fecha}`.replace(' ', 'T');
  const fechaObjeto = new Date(fechaOriginal);
  const opciones = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' };
  const fechaLocal = fechaObjeto.toLocaleString('en-US', opciones);
  setFecha(fechaLocal);
}, [props.fecha]); // Se ejecuta cuando el componente se monta o cuando props.fecha cambia

  
  return (
    <Container className='ct2'>
      <h1>{fecha}</h1>
    </Container>
  );
}
export default FechaFormateada;
