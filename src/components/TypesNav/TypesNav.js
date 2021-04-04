import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";

import {getType} from '../../actions/index.js'

import './TypesNav.css'

function TypesNav(props){

    return(
        <div className='containerTypesNav'>

           <div className='titleItemTypesNav'>
                TYPES
           </div>

           <div className='columnTypes'>

                <div className='column'>

                    <div className='itemTypesNav' onClick={()=>{props.getType('fire')}}>
                        Fire
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('water')}}>
                        Water
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('grass')}}>
                        Grass
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('normal')}}>
                        Normal
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('fighting')}}>
                        Fighting
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('flying')}}>
                        Flying
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('poison')}}>
                        Poison
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('ground')}}>
                        Ground
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('rock')}}>
                        Rock 
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('bug')}}>
                        Bug
                    </div>
                    
                </div>

                <div className='column'>

                    <div className='itemTypesNav' onClick={()=>{props.getType('ghost')}}>
                        Ghost
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('steel')}}>
                        Steel
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('electric')}}>
                        Electric
                    </div>
                    
                    <div className='itemTypesNav' onClick={()=>{props.getType('psychic')}}>
                        Psychic
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('ice')}}>
                        Ice
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('dragon')}}>
                        Dragon  
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('dark')}}>
                        Dark 
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('fairy')}}>
                        Fairy   
                    </div>

                    <div className='itemTypesNav' onClick={()=>{props.getType('shadow')}}>
                        Shadow
                    </div>

                </div>

            </div>
           
            
        </div>
    )
        
    
}

/* function mapStateToProps(state) {
    return {
      indexSearch:state.indexSearch,
      indexLoaded:state.indexLoaded,
    };
  } */
  
  function mapDispatchToProps(dispatch) {
      return {
        getType: (type) => dispatch(getType(type)),
      };
    }

    export default connect(
        null,
        mapDispatchToProps
      )(TypesNav);