import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'; 
import {pokemonSearch} from '../../actions/index.js'
import { connect } from "react-redux";

import './Search.css'

function Search (props){

    const [datos,setDatos] = React.useState({Title:''})

    function handleChange(event) {
        setDatos({...datos,[event.target.name] : event.target.value});
        console.log(datos)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.pokemonSearch(datos)
        setDatos({...datos,Title :''})
    }

    return(

        <div >
            <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                {/* <div> */}
                    {/* <label className="label" htmlFor="title">Película: </label> */}
                    <input
                    type="text"
                    id="title"
                    name = 'Title'
                    autoComplete="off"
                    value={datos.Title}
                    onChange={(e) => handleChange(e)}
                    />
                {/* </div> */}
                {/* <NavLink to="/home/detail" className='link'>  */}
                <button type="submit" className='items2'>search</button>
                {/* </NavLink> */}
            </form>
        </div >
    )

}

/* function mapStateToProps(state) {
    return {

    };
} */

function mapDispatchToProps(dispatch) {
    return {  
        pokemonSearch:name => dispatch(pokemonSearch(name)),
    };
}

export default connect(
    null,
    mapDispatchToProps
  )(Search);