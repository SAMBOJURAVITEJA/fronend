// src/components/AddPokemon.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addPokeMon.css";
import axios from "axios";

const AddPokemon = () => {
  const Navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [formData, setFormData] = useState({
    pokeMonOwnerName: "",
    pokeMonName: "",
    pokeMonAbility: "",
    initialPositionX: "",
    initialPositionY: "",
    speed: "",
    direction: "",
  });

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon-species?limit=100")
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list:", error);
      });
  }, []);

  const handlePokemonChange = (e) => {
    const pokemonName = e.target.value;

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setAbilities(
          response.data.abilities.map((ability) => ability.ability.name)
        );
      })
      .catch((error) => {
        console.error("Error fetching Pokémon abilities:", error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:3000/adding", formData)
      .then((response) => {
        console.log("Pokemon added:", response.data);
        alert("Data Submitted Successfully");
        setFormData({
          pokeMonOwnerName: "",
          pokeMonName: "",
          pokeMonAbility: "",
          initialPositionX: "",
          initialPositionY: "",
          speed: "",
          direction: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting Pokémon data:", error);
        alert("Error submitting data");
      });
  };

  return (
    <div className="addPokeMonUser">
      <h2 className="addPokeyMonHeading">Add Pokemon</h2>

      <form className="createPokeMonFormContainer" onSubmit={handleSubmit}>
        <div className="ownerName">
          <label htmlFor="pokeMonOwnerName">Pokemon Owner Name</label>
          <br />
          <input
            type="text"
            className="addPokeyMonInput"
            id="pokeMonOwnerName"
            placeholder="Specify the Pokemon Owner Name"
            name="pokeMonOwnerName"
            value={formData.pokeMonOwnerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="PokemonName">
          <label htmlFor="pokeMonName">Pokemon Name</label>
          <br />
          <select
            id="pokeMonName"
            name="pokeMonName"
            className="addPokeyMonSelector"
            value={formData.pokeMonName} // Add value for controlled component
            onChange={(e) => {
              handlePokemonChange(e);
              handleChange(e);
            }}
            required
          >
            <option value="">Select Pokemon</option>
            {pokemonList.map((pokemon, index) => (
              <option key={index} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pokemonAbility">
          <label htmlFor="pokemonAbility">Pokemon Ability</label>
          <br />
          <select
            id="pokemonAbility"
            className="addPokeyMonSelector"
            name="pokeMonAbility"
            value={formData.pokeMonAbility}
            onChange={handleChange}
            required
          >
            <option value="">Select Ability</option>
            {abilities.map((ability, index) => (
              <option key={index} value={ability}>
                {ability}
              </option>
            ))}
          </select>
        </div>

        <div className="positionX">
          <label htmlFor="initialPositionX">Initial Position X</label>
          <br />
          <input
            id="initialPositionX"
            className="addPokeyMonInput"
            type="number"
            placeholder="Specify The Initial Position X"
            name="initialPositionX"
            value={formData.initialPositionX}
            onChange={handleChange}
            required
          />
        </div>

        <div className="positionY">
          <label htmlFor="initialPositionY">Initial Position Y</label>
          <br />
          <input
            id="initialPositionY"
            className="addPokeyMonInput"
            type="number"
            placeholder="Specify The Initial Position Y"
            name="initialPositionY"
            value={formData.initialPositionY}
            onChange={handleChange}
            required
          />
        </div>

        <div className="speed">
          <label htmlFor="speed">Speed</label>
          <br />
          <input
            id="speed"
            type="number"
            name="speed"
            className="addPokeyMonInput"
            placeholder="Specify The Speed"
            value={formData.speed}
            onChange={handleChange}
            required
          />
        </div>

        <div className="direction">
          <label htmlFor="direction">Direction</label>
          <br />
          <input
            id="direction"
            type="text"
            placeholder="Specify The Direction"
            className="addPokeyMonInput"
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            required
          />
        </div>

        <div className="addButtonContainer">
          <button
            type="submit"
   
            className="addPokeyMonButton1"
          >
            Add Pokemon
          </button>

          <button
            onClick={() => Navigate("/listOfUsers")}
            className="addPokeyMonButton2"
          >
            List Of Users
          </button>
          <button
            onClick={() => Navigate("/Home")}
            className="addPokeyMonButton3"
          >
            Home
          </button>
          <button onClick={() => Navigate("/")} className="addPokeyMonButton4">
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPokemon;
