import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import PokeCard from "./PokeCard";

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

 const container = [];

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

   const imageResults = urlResults?.map(async (data) => {
    return await data?.sprites?.other?.dream_world?.front_default;
   });

   const imagePromise = await Promise.all(imageResults);
   setmyPokemons(imagePromise);
  } catch (err) {
   console.log(err);
  }
 };

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
   <div>List Of Pokemons</div>
   <div>{info[0]?.count}</div>
   <div>
    <ul>
     {info?.results?.map((data, idx) => {
      return (
       <div key={idx}>
        <li> Name: {data?.name}</li>
        <PokeCard pokemonInfo={myPokemons[idx]} />
       </div>
      );
     })}
    </ul>

    <div>
     <button onClick={previousPage}>Previous</button>
     <button onClick={nextPage}>Next</button>
    </div>
   </div>
  </div>
 );
};

// const testing = async (pokemons) => {
//   try {
//    const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${pokemons}`
//    );
//    const json = await response.json();
//    setAllPokemons(json);
//   } catch (error) {
//    console.log(error);
//   }
//  };

// const container = [];
// const testing = (pokemons) => {
//  try {
//   pokemons.forEach(async (data) => {
//    const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${data?.name}`
//    );
//    const json = await response.json();
//    container.push(json?.sprites?.other?.dream_world?.front_default);
//   });
//  } catch (error) {
//   console.log(error);
//  }
//  console.log(container);
// };

// Esta es la parte que estaba funcionando

// const container = [];

// info?.results?.map(async (data) => {
//  container.push(data?.url);
// });

// const container2 = [];

// const testing = (pokemons) => {
//  try {
//   pokemons.forEach(async (data, idx) => {
//    const response = await fetch(data);
//    const json = await response.json();
//    container2.push(json?.sprites?.other?.dream_world?.front_default);
//   });
//  } catch (error) {
//   console.log(error);
//  }
// };

// testing(container);

// console.log(container2);
