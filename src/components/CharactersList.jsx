import React, { useContext, useEffect } from "react";
import userContext from "../context/User/userContext";
import Spinner from "./Spinner";

export default function CharactersList() {
  // Nos traemos las variables y funciones que necesitamos contenidas en el Context (UserState.jsx)
  const { characters, callStarWarsApi, callGifAPI } = useContext(userContext);

  useEffect(() => {
    if (characters) {
      prevPageButton();
      nextPageButton();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callStarWarsApi]);

  function handleClick(e) {
    const character = e.target.innerText;
    callGifAPI(character);
  }

  function handlePrevPage() {
    if (characters.previous) {
      const prevPage = characters.previous.split("/")[5].split("=")[2];
      callStarWarsApi(prevPage);
    } else {
      alert("no hay más");
    }
  }

  function handleNextPage() {
    if (characters.next) {
      const nextPage = characters.next.split("/")[5].split("=")[2];
      callStarWarsApi(nextPage);
    } else {
      alert("no hay más");
    }
  }

  function prevPageButton() {
    if (characters.previous == null) {
      document.querySelector(".prevButton").disabled = true;
    } else {
      document.querySelector(".prevButton").disabled = false;
    }
  }

  function nextPageButton() {
    if (characters.next == null) {
      document.querySelector(".nextButton").disabled = true;
    } else {
      document.querySelector(".nextButton").disabled = false;
    }
  }

  return (
    <div className="m-5">
      <div className="m-auto font-medium text-center text-slate-300 text-xl">
        {!characters ? (
          <Spinner />
        ) : (
          characters?.results?.map((c) => {
            return (
              <p key={c.name}>
                <button
                  className="no-underline hover:text-yellow-200 active:text-yellow-600 duration-100"
                  onClick={handleClick}
                >
                  {c.name}
                </button>
              </p>
            );
          })
        )}
      </div>
      <div className="w-[80%] m-auto h-[50px] my-2.5 text-center">
        <button
          className="prevButton w-[20%] bg-yellow-200 font-bold text-xl rounded py-1 mx-2 hover:bg-yellow-300 hover:text-indigo-900 disabled:bg-neutral-800 disabled:text-gray-100 disabled:hover:text-gray-400 disabled:cursor-not-allowed duration-100"
          value="prev"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <button
          className="nextButton w-[20%] bg-yellow-200 font-bold text-xl rounded py-1 mx-2 hover:bg-yellow-300 hover:text-indigo-900 disabled:bg-neutral-800 disabled:text-gray-100 disabled:hover:text-gray-400 disabled:cursor-not-allowed duration-100"
          value="next"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
