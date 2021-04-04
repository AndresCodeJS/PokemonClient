import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import firebase from 'firebase';
import {createPokemon,getAllTypes,setUrlImages} from '../../actions/index.js'

import './CreateFirebase.css'

function gridFIrebase(props) {

    return(
        <div className = 'containerGridFirebase'>
                <div className='gridFirebase'>
                    {
                        props.urlImages.length && props.urlImages.map(value=>(
                            <div>
                                <img width='100' height='100' src={value} />
                            </div>
                        ))
                    }
                </div>
        </div>
    )
    
}

function mapStateToProps(state) {
    return {

      urlImages : state.urlImages//Firebase
    };
  }
  
  function mapDispatchToProps(dispatch) {
      return {
       setUrlImages: (urlImages) => dispatch(setUrlImages(urlImages)),//Firebase
      };
    }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(gridFIrebase);