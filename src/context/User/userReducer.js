import { CALL_SW_API, CALL_GIF_API} from "../types";

// El nombre no importa, se le coloca para que no salte un warning
export default function payloader(state, action) {
  // PAYLOAD: Son los datos que me esten pasando en la funcion
  // TYPE: Tipo de dato que se esta recibiendo
  const { payload, type } = action;

  // Definiendo a donde caerían los payloadas enviados en UserState
  switch (type) {
    case CALL_SW_API:
      return {
        ...state,

        // La variable characters, inicialmente un [], se llena con lo recibido en el payload (10 personajes de star wars)
        characters: payload,
      };
    case CALL_GIF_API:
      return {
        ...state,
        // La variable selectedGif, inicialmente un "", se llena con lo recibido en el payload (la embedd url de un gif)
        selectedGif: payload,
      };
    default:
      return state;
  }
}
