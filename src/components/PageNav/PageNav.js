import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import Search from '../Search/Search.js'

import {getPokemons,
        moveGeneralPage,
        moveOrderedName,
        orderByAttack,
        moveAtackOrder} 
        from '../../actions/index.js'

import './PageNav.css'


function PageNav (props){

    var numbers = []
    var initialPage = (props.section-1)*10+1

    var lastPages = 0;
    var totalSections = 0;
    var pagesSection=10;

    if(props.numPages){

        totalSections = Math.ceil(props.numPages/10)

        if(props.section == totalSections){
            console.log('has llegado a la ultima seccion')
            if(props.numPages > 10){
                let pages = (props.numPages/10) - Math.floor(props.numPages/10)
                lastPages = pages*10
                console.log('El numero de paginas es',lastPages)
            }else{
                lastPages = (props.numPages/10)*10;
            }

            pagesSection = initialPage +lastPages - 1;

            console.log('la ultima seccion recorrera desde ,',initialPage,'hasta',pagesSection)

        }else if(props.section < totalSections){
            pagesSection = initialPage+9;
        }
        
        for(var i=initialPage;i<=pagesSection;i++){
            numbers.push(i);
        }

    }

    var ejecuteFunction;

    var argPokemon = props.pokemons;

    if(props.orderByName){
        ejecuteFunction = props.moveOrderedName;
        console.log('se ejecutará orderbyname ',ejecuteFunction)
    }else if(props.orderByAttack){
        ejecuteFunction = props.moveAtackOrder;
        argPokemon = props.pokemonsAttack;
    }else{
        ejecuteFunction = props.moveGeneralPage;
    }
    /* var ejecuteFunction = props.moveGeneralPage; */
    //Los botones ejecutarán una función dependiendo de la categoría actual

    return(
        <div className='containerPageNav'>
            {props.section>1?
            <button onClick={()=>ejecuteFunction(argPokemon,initialPage-10,'prev')}>prev</button>
            :null}
            
            {
                numbers && numbers.map((value,index)=>(
                    
                    <button className = 'buttonPageNav'
                    onClick={()=>ejecuteFunction(argPokemon,value)}>
                        {value}
                    </button>  
                ))
            }
            {props.numPages>10 && props.section<totalSections?
            <button  onClick={()=>ejecuteFunction(argPokemon,initialPage+10,'next')}>next</button>
            :null}
        </div>
    )
}

function mapStateToProps(state) {
    return {
      pokemons: state.pokemon,
      pokemonsAttack : state.pokemonAttack,
      numPages: state.numPages,
      actualCategory: state.actualCategory,
      section: state.section,
      orderByName: state.orderByName,
      orderByAttack: state.orderByAttack
    };
  }
  
  function mapDispatchToProps(dispatch) {
      return {
        getPokemons: pokemon => dispatch(getPokemons(pokemon)),
        moveGeneralPage: (page,pokemon,section) => dispatch(moveGeneralPage(page,pokemon,section)),
        moveOrderedName: (page,pokemon,section) => dispatch(moveOrderedName(page,pokemon,section)),
        moveAtackOrder: (page,pokemon,section) => dispatch(moveAtackOrder(page,pokemon,section)),
      };
    }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(PageNav);