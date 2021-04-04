import React, {useEffect,useRef} from 'react';
import defaultImage from '../../assets/interrogacion.JPG'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import style from './DetailPokemonPop.module.css'
import Home from '../Home/Home'
import ReactDOM from "react-dom";
import back from '../../assets/back.jpg'

export default function DetailPokemonPop(props){

    window.scrollTo(0,props.pos)

    const [redirect, setRedirect] = React.useState(false);

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

      if(redirect){
        return <Redirect to="/home" ></Redirect>;    
      }

    function onClose(){
        setRedirect(true)
        props.close()
    }

    return(
        <div className={style.modalWindow}>
            <div className={style.superior} 
            style={props.data.types[0]?{'background-color':colorObject[props.data.types[0]]}:{'background-color':'rgb(67, 133, 194)'}}>
               
                    <div className={style.imageBack}>
                         <div onClick={()=>{onClose()}}>
                            <img src={back} width='25' height='25'/>
                         </div>  
                    </div>
                    <div className={style.name}>
                    <img src={props.data.urlImage || defaultImage} height='150' width='150' />
                    
                        {props.data.name.toUpperCase()}
                    </div>
            </div>
            
            <div className={style.inferior} >
                    <div className={style.left}>
                        <div >Hp </div>
                        <div >Attack </div>
                        <div >Defense </div>
                        <div >Speed </div>
                        <div >Height </div>
                        <div >Weight </div>
                        {props.data.types.length?
                            <div className={style.types}>Types</div>
                            :null
                        }
                    </div >
                    <div className={style.midle}>
                        <div>{props.data.hp }</div>
                        <div>{props.data.attack }</div>
                        <div>{props.data.defense }</div>
                        <div>{props.data.speed }</div>
                        <div>{props.data.height }</div>
                        <div>{props.data.weight }</div>
                        <div className={style.types}>

                        {
                         props.data.types && props.data.types.map(value=>(
                            <div className='typeItem' style={{'background-color':colorObject[value]}}>
                                <div className={'typeName'}>{value.toUpperCase()}</div>
                            </div>
                        ))
                        }

                        </div>
                    </div>
                    <div className={style.right}>
                       <div className={style.backgoundBar}>
                            <div className={style.barStat} 
                            style={{'width':`${(props.data.hp/120)*120*2}px`}}></div>
                       </div>
                       <div className={style.backgoundBar}>
                            <div className={style.barStat} style={{'width':`${(props.data.attack/120)*120*2}px`}}></div>
                       </div>
                       <div className={style.backgoundBar}>
                            <div className={style.barStat} style={{'width':`${(props.data.defense/120)*120*2}px`}}></div>
                       </div>
                       <div className={style.backgoundBar}>
                            <div className={style.barStat} style={{'width':`${(props.data.speed/120)*120*2}px`}}></div>
                       </div>
                       <div className={style.backgoundBar}>
                            <div className={style.barStat} style={{'width':`${(props.data.height/120)*120*2}px`}}></div>
                       </div>
                    </div>
            </div>
        </div>
    )
    
    
}



