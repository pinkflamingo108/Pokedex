import "./App.css";
import React, { useState, useEffect } from "react";
import { PokeCard } from "./PokeCard";

const App = () => {
 const [pokemon, setPokemon] = useState("");
 const [info, setinfo] = useState([]);

 const getInfo = async (pokeName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  await fetch(url)
   .then((res) => res.json())
   .then((data) => {
    setinfo(data);
   })
   .catch((err) => console.log(err));
 };

 const updateValue = (e) => {
  setPokemon(e.target.value);
 };

 const onClick = (e) => {
  e.preventDefault();
  const data = getInfo(pokemon);
 };

 useEffect(() => {
  getInfo(pokemon);
 }, []);

 return (
  <div>
   <div>
    <form>
     <input type="text" onChange={updateValue} />
     <button onClick={onClick}>Submit</button>
    </form>
   </div>
   <h1>Pokedex</h1>
   <div>Name: {info.name}</div>
   <div>Height: {info.height}ft</div>
   <div>Weight: {info.weight}lb</div>
   <div>Id: {info.id}</div>
   <img src={info?.sprites?.other?.dream_world?.front_default} />
  </div>
 );
};

export default App;
