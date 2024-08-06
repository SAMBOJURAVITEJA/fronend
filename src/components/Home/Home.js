import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonPositions, setPokemonPositions] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [isFrozen, setIsFrozen] = useState(false);

  useEffect(() => {
    // Fetch all users
    fetch("http://localhost:3000/dropDown")
      .then((response) => response.json())
      .then((data) => {
        const usersData = data.map((user) => ({
          name: user.pokeMonOwnerName,
          id: user.id,
        }));
        setUsers(usersData);
        console.log("usersData", usersData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    if (selectedUser !== null) {
      // Fetch Pokémon for the selected user by ID
      fetch("http://localhost:3000/ownerRelatedToParticularId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: selectedUser }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPokemons(data);
          const positions = data.reduce((acc, pokemon) => {
            acc[pokemon.pokemonId] = {
              left: pokemon.initialPositionX,
              top: pokemon.initialPositionY,
              visible: true,
              frozen: false,
            };
            return acc;
          }, {});
          setPokemonPositions(positions);
        })
        .catch((error) => console.error("Error fetching Pokémon:", error));
    }
  }, [selectedUser]);

  function handleGo() {
    if (isFrozen) {
      console.log("Pokémon are frozen. Movement stopped.");
      return; // If Pokémon are frozen, do nothing
    }

    console.log("handleGo called");
    const newPositions = { ...pokemonPositions };

    pokemons.forEach((pokemon) => {
      const speed = pokemon.speed || 0;
      const direction = pokemon.direction ? pokemon.direction.toLowerCase() : ''; // Add a fallback

      if (direction === "north") newPositions[pokemon.pokemonId].top -= speed;
      if (direction === "south") newPositions[pokemon.pokemonId].top += speed;
      if (direction === "east") newPositions[pokemon.pokemonId].left += speed;
      if (direction === "west") newPositions[pokemon.pokemonId].left -= speed;

      // Ensure Pokémon is within bounds
      if (
        newPositions[pokemon.pokemonId].left < 0 ||
        newPositions[pokemon.pokemonId].left > 1000 ||
        newPositions[pokemon.pokemonId].top < 0 ||
        newPositions[pokemon.pokemonId].top > 600
      ) {
        newPositions[pokemon.pokemonId].visible = false;
      } else {
        newPositions[pokemon.pokemonId].visible = true;
      }
    });

    console.log("Updated Positions:", newPositions);
    setPokemonPositions(newPositions);
  }

  const handleFlee = () => {
    setIsVisible(!isVisible);
  };

  const handleCease = () => {
    setIsFrozen(!isFrozen);
  };

  return (
    <div className="homeContainer">
      <div className="dropdownContainer">
        <select
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="dropdown"
        >
          <option value="">List of Pokemon Owner</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      {selectedUser && (
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>Name Of Pokemon</th>
                <th>PokeMonAbility</th>
              </tr>
            </thead>
            <tbody>
              {pokemons.map((pokemon) => (
                <tr key={pokemon.pokemonId}>
                  <td>{pokemon.pokeMonName}</td>
                  <td>{pokemon.pokeMonAbility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="buttonContainer">
        <button onClick={handleGo} className="button">
          Pokemon Go
        </button>
        <button onClick={handleFlee} className="button">
          Pokemon Flee
        </button>
        <button onClick={handleCease} className="button">
          {isFrozen ? "Resume" : "Pokemon Cease"}
        </button>
        <button
          style={{ background: "red", color: "#ffffff" }}
          onClick={() => navigate("/Registration")}
          className="button"
        >
          Back
        </button>
      </div>
      <div className="pokemonField">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.pokemonId}
            className="pokemon"
            style={{
              left: `${pokemonPositions[pokemon.pokemonId]?.left}px`,
              top: `${pokemonPositions[pokemon.pokemonId]?.top}px`,
              display:
                pokemonPositions[pokemon.pokemonId]?.visible && isVisible
                  ? "block"
                  : "none",
            }}
          >
            🟡
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
