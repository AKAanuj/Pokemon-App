import axios from 'axios';
import React from 'react';

function GetPokemons(){
  return axios.create({
  method:"GET",
  url:"https://pokeapi.co/api/v2/pokemon/",
});
}
export default GetPokemons;
