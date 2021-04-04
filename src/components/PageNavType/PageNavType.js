import React from 'react';
import { connect } from "react-redux";
import {movePageType}  from '../../actions/index.js'

import './PageNavType.css';

function PageNavType (props){

    return(
        <div className='containerPageNavType'>

            {props.section>1?
            <button className='buttonPageNavType' 
            onClick ={()=>{props.movePageType(props.type,props.storageTypePage,props.indexSearch,props.section,'prev')}}>prev</button>
            :null
            }
            {props.indexSearch>=0?
            <button className='buttonPageNavType'
            onClick ={()=>{props.movePageType(props.type,props.storageTypePage,props.indexSearch,props.section,'next')}}>next</button>
            :null
            }

        </div>
    )

}

function mapStateToProps(state) {
    return {
        indexSearch: state.indexSearch,
        indexLoaded: state.indexLoaded,
        section: state.section,
        type: state.actualCategory,
        storageTypePage: state.storageTypePage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        movePageType: (pokemon,indexSearch,storageTypePage,section,action) => dispatch(movePageType(pokemon,indexSearch,storageTypePage,section,action)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageNavType);