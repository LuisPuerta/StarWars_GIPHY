import "./App.css";
import CharactersList from "./components/CharactersList";
import Searcher from "./components/Searcher";
import ShowGifs from "./components/ShowGifs";
import UserState from "./context/User/UserState";

const body = document.querySelector("body");
body.classList.add("bg-zinc-800");

function App() {
  return (
    <div>
      <UserState>
        <div className="starWars-font mt-5 text-center text-2xl text-white font-bold">
          <h1> STAR WARS GIPHY SEARCHER</h1>
        </div>
        <div className="main w-[500px] m-auto rounded">
          <Searcher />
          <CharactersList />
        </div>
        <ShowGifs />
      </UserState>
    </div>
  );
}

export default App;
