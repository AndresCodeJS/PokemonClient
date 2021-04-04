import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import {getPokemons} from '../../actions/index.js'

import './LandingPage.css'

function LandingPage(props) {

    return(
      <div className='containerLanding'>
        <div className='imageLandingizq'>

      
        </div>
      


        <div className='imageLanding'>
            <NavLink to='/home' className='linkLanding' onClick={()=>{props.getPokemons()}}>
                <div className='buttonLanding'>
                    <div className='labelButtonLanding'>
                        START
                    </div>
                </div>
           </NavLink>

        </div>

        <div className='imageLandingder'>

          
        </div>
      </div>
    )
}

/* function mapStateToProps(state) {
    return {
      pokemons: state.pokemon,
      numPages: state.numPages,
      actualItems: state.actualItems,
      pokemon: state.pokemonAttack,
      actualCategory: state.actualCategory,
    };
  } */
  
  function mapDispatchToProps(dispatch) {
      return {
        getPokemons: pokemon => dispatch(getPokemons(pokemon))
      };
  }

    export default connect(
        null,
        mapDispatchToProps
      )(LandingPage);