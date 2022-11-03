import React, { useContext, useState, useRef } from "react";
import { useEffect } from "react";
import userContext from "../context/User/userContext";

export default function Searcher() {
  const { callStarWarsApi } = useContext(userContext);

  const inputSearch = useRef(null);
  const [SearchedCharacter, setSearchedCharacter] = useState("");

  // Ya que el useState es asíncrono, para este caso se necesita setear el searchedCharacter con un useEffect y no en el mismo handleChange
  // Al renderizar la app por primera vez, se traerá la lista completa
  useEffect(() => {
    callStarWarsApi(1, SearchedCharacter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SearchedCharacter]);

  function handleChange(e) {
    setSearchedCharacter(e.target.value);
  }

  return (
    <div className="m-auto mt-10 w-[20rem] text-center">
      <input
        type="text"
        placeholder="Look for a character"
        className="mt-5 w-[100%] rounded p-1"
        onChange={handleChange}
        ref={inputSearch}
      />
    </div>
  );
}
