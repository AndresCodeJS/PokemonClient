import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import sinImagen from '../../assets/sinImagen.png'

import './DetailPokemon.css'

function DetailPokemon(props){

    var color = 'rgb(67, 133, 194)';

    switch (props.detail.types && props.detail.types[0]){

            case 'fire':color ='#F08030';break;
            case 'bug': color='#A8B820'; break;
            case 'dragon': color='#7038F8';break;
            case 'dark': color='#705848';break;
            case 'electric': color='#F8D030';break;
            case 'fairy': color='#EE99AC';break;
            case 'fighting': color='#C03028';break;
            case 'flying': color='#A890F0';break;
            case 'ghost': color='#705898';break;
            case 'grass': color='#78C850';break;
            case 'ground': color='#E0C068';break;
            case 'ice': color='#98D8D8';break;
            case 'normal': color='#A8A878';break;
            case 'poison':color='#A040A0';break;
            case 'rock':color='#F85888';break;
            case 'steel': color='#B8A038' ; break;
            case 'water':color='#B8B8D0';break;
            case'psychic' :color= 'rgba(177, 76, 202, 0.246)';break;  

    }



    return(
        <div className='containerDetailPokemon'>

            {props.detail.id &&
            <div className='subContainerDetail'>

                <div className='imageDetail'
                id={props.detail.name} 
                style={{'background-color':color}}>
                     <img src={props.detail.urlImage || sinImagen || ''} height='300' width='300'/>
                </div>

                <div className='statsDetail'>
                    <div className='namePokemonStats'>
                        {props.detail.name && props.detail.name.toUpperCase()} 
                    </div>
                    {/* <div className='titleStats'>
                        STATS
                    </div> */}
                    <div className='statsContent'>

                        <div className='labelsContainer'>  
                            <div className='labelStatDetail'>HP: {props.detail.hp }</div>
                            <div className='labelStatDetail'>Attack: {props.detail.attack }</div>
                            <div className='labelStatDetail'>Defense: {props.detail.defense }</div>
                            {props.detail.specialAttack?
                            <div className='labelStatDetail'>Special Attack: {props.detail.specialAttack }</div>
                            :null
                            }
                            {props.detail.specialDefense?
                            <div className='labelStatDetail'>Special Defense: {props.detail.specialDefense }</div> 
                            :null
                            }
                            <div className='labelStatDetail'>Speed: {props.detail.speed }</div>
                            <div className='labelStatDetail'>Height: {props.detail.height }</div>
                            <div className='labelStatDetail'>Weight: {props.detail.weight }</div>
                        </div>
                            {/* ---------------------------------------------------------------------------------- */}

                        <div className='barsContainer'> 
                            <div className='barStatsDetail' style={{'width':`${props.detail.hp}px`}}></div>
                            <div className='barStatsDetail' style={{'width':`${props.detail.attack}px`}}></div>
                            <div className='barStatsDetail' style={{'width':`${props.detail.defense}px`}}></div>
                            {props.detail.specialAttack?
                            <div className='barStatsDetail' style={{'width':`${props.detail.specialAttack}px`}}></div>
                            :null
                            }
                            {props.detail.specialDefense?
                            <div className='barStatsDetail' style={{'width':`${props.detail.specialDefense}px`}}></div>
                            :null
                            }
                            <div className='barStatsDetail' style={{'width':`${props.detail.speed}px`}}></div>
                            <div className='barStatsDetail' style={{'width':`${props.detail.height}px`}}></div>
                            <div className='barStatsDetail' style={{'width':`${props.detail.weight>1400?props.detail.weight/18:props.detail.weight/6}px`}}></div>
                        </div>
                        
                    </div>
                    <div className='labelTypeDetail'> 

                        <div>Type:</div>
                        {
                         props.detail.types && props.detail.types.map(value=>(
                            <div className='typeItemDetail'>
                                {value.toUpperCase()}
                             </div>
                         ))      
                        }  
                    </div>
                </div>
            </div>
            }
   
        </div>
    )
}

function mapStateToProps(state) {
    return {
      detail: state.detailPokemon
    }
}


export default connect(
    mapStateToProps
    /* mapDispatchToProps */
  )(DetailPokemon);