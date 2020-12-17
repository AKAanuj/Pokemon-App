import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import PokemonList from "../PokemonList";
import PokemonStats from "../PokemonStats";

const Stack=createStackNavigator({
  PokemonList:PokemonList,
  PokemonStats:PokemonStats,
});
const AppContainer=createAppContainer(Stack);

const MainStackNavigator=()=>{
  return (
  <AppContainer />
);
}

export default MainStackNavigator;
