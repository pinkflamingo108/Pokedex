import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "./FetchPokemons.css";
import Pokeball from "./Pokeball.png";

export const FetchPokemons = () => {
 const [info, setInfo] = useState([]);
 const [myUrl, setmyUrl] = useState(`https://pokeapi.co/api/v2/pokemon`);
 const [nextUrl, setnextUrl] = useState();
 const [previousUrl, setpreviousUrl] = useState();
 const [loading, setloading] = useState(true);
 const [myPokemons, setmyPokemons] = useState([]);

 const getInfo = async () => {
  await fetch(myUrl)
   .then((res) => res.json())
   .then((data) => {
    setInfo(data);
    setnextUrl(data?.next);
    setpreviousUrl(data?.previous);
   })
   .catch((err) => console.log(err));
 };

 function nextPage() {
  setmyUrl(nextUrl);
 }

 function previousPage() {
  setmyUrl(previousUrl);
 }

 const fetchPokemons = async () => {
  try {
   const promisesUrl = info?.results?.map(async (pokemons) => {
    return await pokemons?.url;
   });
   const results = await Promise.all(promisesUrl);

   const promisesImages = results?.map(async (url) => {
    const fetching = await fetch(url);
    const response = await fetching.json();
    return await response;
   });
   const urlResults = await Promise.all(promisesImages);

   setmyPokemons(urlResults);
  } catch (err) {
   console.log(err);
  }
 };

 function pokeColor(poke) {
  if (poke === "grass") {
   return "green";
  } else if (poke === "water") {
   return "blue";
  } else if (poke === "fire") {
   return "red";
  } else if (poke === "poison") {
   return "pink";
  } else if (poke === "electric") {
   return "yellow";
  } else if (poke === "ground") {
   return "brown";
  } else if (poke === "normal") {
   return "normal";
  } else if (poke === "fairy") {
   return "purple";
  } else if (poke === "bug") {
   return "bug";
  } else if (poke === "bug") {
   return "bug";
  } else if (poke === "fighting") {
   return "orange";
  } else if (poke === "rock") {
   return "grey";
  } else if (poke === "psychic") {
   return "psychic";
  } else if (poke === "dragon") {
   return "dragon";
  } else if (poke === "ice") {
   return "ice";
  } else if (poke === "ghost") {
   return "ghost";
  } else if (poke === "ice") {
   return "ice";
  } else if (poke === "dark") {
   return "dark";
  }
 }

 useEffect(() => {
  fetchPokemons();
 });

 useEffect(() => {
  setloading(false);
  getInfo();
  setloading(true);
 }, [myUrl]);

 if (!loading) {
  return <div>loading....</div>;
 }

 return (
  <div>
   <div className="pokemon-header">List Of Pokemons:</div>
   <div className="pokemon-container">
    {myPokemons?.map((info, idx) => {
     return (
      <div id={pokeColor(info?.types[0]?.type?.name)} className="pokemon-box">
       <div className="img-container">
        <img
         key={idx}
         alt={info?.name}
         className="poke-image"
         src={info?.sprites?.other?.dream_world?.front_default}
        />
       </div>
       <div className="text-box">
        <p className="paragraph">Name: {info?.name}</p>
        <p className="paragraph">Height: {info?.height}ft</p>
        <p className="paragraph">Type: {info?.types[0]?.type?.name}</p>
       </div>
       <div className="ball">
        <img key={idx} alt={Pokeball} src={Pokeball} />
        <span className="poke-id"> #{info?.id}</span>
       </div>
      </div>
     );
    })}
   </div>

   <div className="buttons-container">
    <button id="main-btn" className="btn btn-primary" onClick={previousPage}>
     Previous
    </button>
    <button id="main-btn" className="btn btn-primary" onClick={nextPage}>
     Next
    </button>
   </div>
  </div>
 );
};
