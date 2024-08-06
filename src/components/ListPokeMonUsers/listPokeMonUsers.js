import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./listPokeMonUsers.css";

const ListPokemonUsers = () => {
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/allOwners");
      console.log(response);
      // Set the users state with the data directly since it's an array
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAdd = (userId) => {
    console.log("userId", userId);
    window.location.href = `/existingRegistration/${userId}`;
  };
  const allDelete = () => {
    try {
      axios.delete("http://localhost:3000/allDelete");
      alert("Deletion is successfull");
      fetchUsers();
      Navigate("/Registration");
    } catch (err) {
      alert("Deletion not successfull");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete("http://localhost:3000/particularDelete", {
        data: { id: userId },
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("deleted successfully");
      fetchUsers();
    } catch (error) {
      alert("not deleted successfully");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="listPokemonUsers">
      <h2>List of Pokemon Users</h2>
      <div className="listPokemonbuttoncontainer">
        <button className="listPokeMonUsersButton" onClick={allDelete}>
          Delete
        </button>
      </div>

      <table cellpadding="5">
        <thead>
          <tr align="center">
            <th>pokemonOwnerName</th>
            <th>pokemonName</th>
            <th>pokemonAbility</th>
            <th>Number of pokemons</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody align="center">
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.pokeMonOwnerName}</td>
              <td>{user.pokeMonName}</td>
              <td>{user.pokeMonAbility}</td>
              <td>{user.counting}</td>
              <td>
                <button onClick={() => handleAdd(user.userId)}>Add</button>
                <button onClick={() => handleDelete(user.userId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="listPokemonbuttoncontainer">
        <button id="specificButton" onClick={() => Navigate("/Registration")}>Back</button>
      </div>
    </div>
  );
};

export default ListPokemonUsers;
