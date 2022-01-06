import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FetchPokemons } from "./FetchPokemons";
import { Navbar } from "./Navbar";

ReactDOM.render(
 <>
  <Navbar />
  <App />
  <FetchPokemons />
 </>,
 document.getElementById("root")
);
