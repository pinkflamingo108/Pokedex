import React from "react";

const PokeCard = (props) => {
 const { pokemonInfo } = props;
 return (
  <div>
   <div>
    <img src={pokemonInfo} />
   </div>
  </div>
 );
};

export default PokeCard;
