// src/AddPokemonToUser.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./addPokeMonExistingUser.css";

const AddPokemonToUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [abilities, setAbilities] = useState([]);
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/dropDownId",
        { id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setOwnerName(response.data[0].pokeMonOwnerName);
      })
      .catch((error) => console.error("Error fetching Owner list:", error));
  }, [id]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((error) => console.error("Error fetching Pokemon list:", error));
  }, []);

  const handlePokemonChange = (e) => {
    setPokemonName(e.target.value);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`)
      .then((response) => {
        const abilitiesData = response.data.abilities.map(
          (a) => a.ability.name
        );
        setAbilities(abilitiesData);
        if (abilitiesData.length === 1) {
          setPokemonAbility(abilitiesData[0]);
        } else {
          setPokemonAbility("");
        }
      })
      .catch((error) => console.error("Error fetching abilities:", error));
  };

  const handleAddPokemon = (e) => {
    e.preventDefault();

    if (!pokemonName || !pokemonAbility) {
      alert("Please fill all fields");
      return;
    }

    const newPokemon = {
      userId: id,
      pokeMonName: pokemonName,
      pokeMonAbility: pokemonAbility,
    };

    console.log(newPokemon);
    axios
      .post("http://localhost:3000/insertParticularId", newPokemon, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Pokemon added:", response.data);
        alert("Data Submitted Successfully");
        navigate("/listOfUsers");
      })
      .catch((error) => {
        console.error("Error submitting Pokémon data:", error);
        alert("Error submitting data");
      });
  };

  return (
    <div className="add-pokemon-container">
      <div className="border-container">
        <h2>Add Pokemon to Existing User</h2>
        <form className="form-group" onSubmit={handleAddPokemon}>
          <label>Pokemon Owner</label>
          <select>
            <option>select option</option>
            <option value={ownerName}>{ownerName}</option>
          </select>

          <label>Pokemon Name</label>
          <select value={pokemonName} onChange={handlePokemonChange}>
            <option value="">Select Pokemon</option>
            {pokemonList.map((pokemon) => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
          <label>Pokemon Ability</label>
          <select
            value={pokemonAbility}
            onChange={(e) => setPokemonAbility(e.target.value)}
          >
            <option value="">Select Ability</option>
            {abilities.map((ability) => (
              <option key={ability} value={ability}>
                {ability}
              </option>
            ))}
          </select>
          <button className="add-button" type="submit">
            Add Pokemon
          </button>
          <button
          className="existingUserButton"
            
            onClick={() => navigate("/listOfUsers")}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPokemonToUser;
