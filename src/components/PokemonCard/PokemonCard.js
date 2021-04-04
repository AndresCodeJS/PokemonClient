import React from 'react';
import sinImagen from '../../assets/sinImagen.png'
import interrogacion from '../../assets/interrogacion.JPG'
import {useDispatch} from 'react-redux'
import {getPokemons} from '../../actions/index.js'
import axios from 'axios'

import './PokemonCard.css'

export default function PokemonCard(props){

    var color = ' rgb(67, 133, 194)';

    const dispatch = useDispatch()
    
    var colorObject = {
        fire:'#F08030', 
        bug:'#A8B820' ,     
        dragon:'#7038F8',
        dark: '#705848',
        electric:'#F8D030',
        fairy: '#EE99AC',
        fighting: '#C03028',
        flying:'#A890F0',
        ghost: '#705898',
        grass: '#78C850',
        ground:'#E0C068',
        ice: '#98D8D8',
        normal:'#A8A878',
        poison:'#A040A0',
        rock:'#F85888',
        steel: '#B8A038',
        water:'#B8B8D0',
        psychic:'rgba(177, 76, 202, 0.246)'
    }

    async function onDelete(id) {
        try{
            const { data } = await axios.post(
               /*  `http://localhost:3001/mypokemons` */
                `https://app-fullmovies.herokuapp.com/delete/${id}`)
            if(data){
                props.delete()
                dispatch(getPokemons())
            }   
        }catch(err){
            console.log(err)
            alert('No se pudo borrar el pokemon')
        }
        
    }

    return(
        <div className='containerCard' id={props.data.name} 
        onMouseOver={()=>{document.getElementById(props.data.name).style.borderColor=color} }
        onMouseLeave={()=>{document.getElementById(props.data.name).style.borderColor='grey' }}
        >
            <div className='topPokemonCard' onClick={()=>props.modal(props.data)}
             style={props.data.types[0]?{'background-color':colorObject[props.data.types[0]]}:{'background-color':'rgb(67, 133, 194)'}}>
                {props.data.urlImage?
                <img src={props.data.urlImage || sinImagen} height='110' width='110'/>
                :<div className={'containerInterr'}><img className={'imagenInterr'} src={interrogacion} height='113' width='213' /></div>
            }
            </div>
        
            <div className='statsPokemonCard'>   
                <div className='namePokemon' onClick={()=>props.modal(props.data)}>
                    <div> {props.data.name && props.data.name.toUpperCase()} </div> 
                </div>

                {!props.data.specialAttack?
                <div className='deleteButton' onClick={()=>onDelete(props.data.id)}>x</div>
                :null}
                
                {props.data.types.length?
                <div className='types' onClick={()=>props.modal(props.data)}>
                    <div className='textStyle'>Type:</div>
                    {
                    props.data.types && props.data.types.map(value=>(
                        <div className='typeItem' style={{'background-color':colorObject[value]}}>
                            <div className={'typeName'}>{value.toUpperCase()}</div>
                        </div>
                    ))
                    
                    }
                    {/* <div className='typeItem' style={{'background-color':colorObject[value]}}> */}
                </div>
                :null}
            </div>
        </div>
    )
        
}