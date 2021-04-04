import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import Search from '../Search/Search.js'
import logo from '../../assets/pikachu.png';
import {getPokemons,getMyPokemons} from '../../actions/index.js'

import './NavBar.css';

 function NavBar (props){

    return(
        <header className='bar'>

            <nav className='options'>                   
                      <NavLink exact to="/home" className='link'>
                       <div className='items' onClick ={()=> props.getPokemons(props.pokemons)}>
                          
                            HOME
                          
                       </div>
                       </NavLink> 

                       <NavLink to="/home/create" className='link'>
                       <div className='createPokemon'>
                            CREATE POKEMON
                       </div>
                       </NavLink> 
                       <NavLink exact to="/home" className='link'>
                       <div className='myPokemons' onClick={()=>{props.getMyPokemons()}}>
                            MY POKEMONS
                       </div>
                       </NavLink>
            </nav>

            <div className='logoPokemon'> {/* Imagen logo app pokemon */}
                    <img src={logo} width='70' height='100' alt='aa'/>
            </div>

            <div className='search'>
            <Search></Search>
            </div>

        </header>
    )
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemon,
  };
}

function mapDispatchToProps(dispatch) {
    return {
      getPokemons: pokemon => dispatch(getPokemons(pokemon)),
      getMyPokemons: pokemon => dispatch(getMyPokemons(pokemon)),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar);