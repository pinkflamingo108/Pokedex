import React from "react";
import "./Navbar.css";
import pokeImage from "./pokeImage.png";

export const Navbar = () => {
 return (
  <div id="navbar">
   <div className="images-container">
    <img className="main-image" src={pokeImage} />
   </div>
  </div>
 );
};
