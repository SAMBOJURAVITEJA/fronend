import AddPokemon from "./components/CreatePokemonUsers/addPokeMon";
import AddPokemonToUser from "./components/AddPockeMonExistingUser/addPokeMonExistingUser";
import ListPokemonUsers from "./components/ListPokeMonUsers/listPokeMonUsers";
import Home from "./components/Home/Home";
import UserPage from "./components/UserPage/userPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<UserPage/>} />
          <Route exact path="/Home" element={<Home />} />
          <Route
            exact
            path="/existingRegistration/:id"
            element={<AddPokemonToUser />}
          />
          <Route exact path="/Registration" element={<AddPokemon />} />
          <Route exact path="/listOfUsers" element={<ListPokemonUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
