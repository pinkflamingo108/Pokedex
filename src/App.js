import "./App.css";
import React, { useState, useEffect } from "react";
import Pokeball from "./Pokeball.png";

const App = () => {
 const [pokemon, setPokemon] = useState("");
 const [info, setinfo] = useState([]);

 const getInfo = async (pokeName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  await fetch(url)
   .then((res) => res.json())
   .then(async (data) => {
    setinfo(data);
   })
   .catch((err) => console.log(err));
 };

 const updateValue = (e) => {
  setPokemon(e.target.value.toLowerCase());
 };

 const onClick = (e) => {
  e.preventDefault();
  const data = getInfo(pokemon);
  const selectDisplay = document.querySelector(".noDisplay");
  selectDisplay.style.display = "block";

  return data;
 };

 useEffect(() => {
  getInfo(pokemon);
 }, []);

 return (
  <div>
   <div className="header-container">
    <h1 className="header">Gotta Catch 'Em All!</h1>
   </div>
   <div className="input-container">
    <form className="main-form">
     <input
      placeholder="Search for a pokemon creature"
      id="main-input"
      className="form-control shadow-none"
      type="text"
      onChange={updateValue}
     />
     <button
      id="main-btn"
      className="btn btn-primary btn-lg btn-block shadow-none"
      onClick={onClick}
     >
      Submit
     </button>
    </form>
   </div>

   <div id="poke-container">
    <div className="poke-center">
     <div className="noDisplay">
      <div className="poke-selector">
       <div className="img-container">
        <img
         alt={info?.name}
         className="poke-img"
         src={info?.sprites?.other?.dream_world?.front_default}
        />
       </div>
       <div className="info-container">
        <div className="text-container">
         <div>Name: {info?.name}</div>
         <div>Height: {info?.height}ft</div>
         <div>Weight: {info?.weight}</div>
         <div>
          My Pokemon Type is:
          {info?.types?.map((data) => {
           return <div>- {data?.type?.name}</div>;
          })}
         </div>
         <span>
          <img src={Pokeball} alt={info?.name} />
         </span>
         #{info?.id}
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default App;
