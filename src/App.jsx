import "./index.css"
import PokemonHome from "./components/PokemonHome";
import { Route, Routes } from "react-router-dom";
import PokeDetail from "./components/PokeDetail";

export default function PokemonApp() {
 
  return(
    <> 
      <Routes>
        <Route path="/details/:id" element={<PokeDetail/>}/>
        <Route path="/" element={<PokemonHome/>}/>
      </Routes>
      </>

  )
}