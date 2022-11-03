import { useContext } from "react";
import userContext from "../context/User/userContext";
import Spinner from "./Spinner";

export default function ShowGifs() {
  // Nos traemos las variables y funciones que necesitamos contenidas en el Context
  const { selectedGif } = useContext(userContext);

  return (
    <div className="w-auto min-w-[80%] m-auto">
      {selectedGif == null ? (
        <Spinner/>
      ) : (
        <iframe
          src={selectedGif.embed_url}
          width="300"
          title={selectedGif.title}
          frameBorder="0"
          className="giphy-embed m-auto w-[50%]"
        ></iframe>
      )}
    </div>
  );
}
