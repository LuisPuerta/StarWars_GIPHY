import React, { useReducer } from "react";

import userContext from "./userContext";
import userReducer from "./userReducer";

// Definimos los estados iniciales primordiales (los personajes que se listaran y el gif a mostrar)
export default function UserState(props) {
  const initialState = {
    characters: "",
    selectedGif: "",
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Star wars api URL
  const SW_url = "https://swapi.dev/api/people/";

  //API Key y URL de la API de GIPHY
  const API_key = "UYB6O0WZSE4yARnLNytEMTHyeOOmliVd";
  const GIPHY_url = "https://api.giphy.com/v1/gifs/search";

  // Funcion que llamará la API de los personajes de star wars
  async function callStarWarsApi(page, search = "") {
    // Variable auxiliar para limpiar el payload
    const auxNull = null;

    try {
      // Cada vez que se ejecute la función, se limpiará el payload (para que haya un feedback mientras se cambia de página ya que a veces la API tarda en cargar)
      dispatch({
        type: "CALL_SW_API",
        payload: auxNull,
      });

      const res = await fetch(`${SW_url}?page=${page}&search=${search}`);
      const resJSON = await res.json();

      dispatch({
        type: "CALL_SW_API",
        // Por alguna razon, no funciona si hago setPeople(resJSON.results) y luego envio a "people" en el payload, así que envio el payload con toda la expresión
        payload: resJSON,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function callGifAPI(parameter) {
    // Variable auxiliar para limpiar el payload
    const varAux = null;

    try {
      // Cada vez que se busque un gif, se limpiará el payload para colocar un spinner
      dispatch({
        type: "CALL_GIF_API",
        payload: varAux,
      });

      const res = await fetch(`${GIPHY_url}?q=${parameter}&api_key=${API_key}`);
      const resJSON = await res.json();

      // Envio al payload solo el primer resultado (por ahora, me gustaría colocar al menos 5)
      const result = resJSON.data[0];
      dispatch({
        type: "CALL_GIF_API",
        payload: result,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <userContext.Provider
      // Aquí se listan las funciones y variables que se quieren exportar a través del context
      value={{
        characters: state.characters,
        selectedGif: state.selectedGif,
        callStarWarsApi,
        callGifAPI,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}
