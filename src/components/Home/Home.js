import React, {useEffect,useRef} from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import PageNav from '../PageNav/PageNav.js'
import PokemonCard from '../PokemonCard/PokemonCard.js'
import TypesNav from '../TypesNav/TypesNav.js'
import {Modal} from 'reactstrap'
import {motion} from 'framer-motion';
import DetailPokemonPop from '../DetailPokemonPop/DetailPokemonPop'
import PageNavType from '../PageNavType/PageNavType'
import blastoise from '../../assets/blastoise.jpg';
import squartle from '../../assets/squartle.png'
import psyduck from '../../assets/psyduck.png'
import Popup from '../popup/popup'

import {getPokemons,orderByName,orderByAttack,getDetail} from '../../actions/index.js'

import './Home.css';

function Home(props) {

    const [open,setOpen] = React.useState({open:false,
                                           image:null,
                                           deleted:false});
    const [pos,setPos]= React.useState(0);

    function  modalOpen(value) {
        props.getDetail(value.id)
        setPos(window.scrollY)
        setOpen({open:true, data:value})
    }

    function modalClose() {
        setOpen({...open,open:false})
    }

    async function onCloseModal() {
        setOpen({...open,deleted:false})
    }

    async function onDelete(params) {
        setOpen({...open,deleted:true})
        setPos(window.scrollY)
    }

    const pageVariants2 = {
        in:{
            opacity: 1,
            x:-400
        },
        out:{
            opacity: 0,
            x:100
        }
    }

    const pageTransition2 = {
        duration:0.3
    }

    const pageVariants = {
        in:{
            opacity: 1,
            y:100
        },
        out:{
            opacity: 0,
            y:-100
        }
    }

    const pageTransition = {
        duration:0.4
    }
  
    return(

        <div className='containerHome'>

                <Modal isOpen={open.deleted} className='openModal objectModal'>
                    <motion.div 
                        initial='out' 
                        exit='out' 
                        animate='in'
                        variants={pageVariants}
                        transition={pageTransition}>

                        <Popup image={psyduck} 
                               close={onCloseModal}
                               position={pos} 
                               title={'Pokemon Deleted!'}>
                        </Popup>
                    </motion.div>
                </Modal>

            <div className='subContainerHome'>  

                <div className='ContainerHomeTypesNav'>
                    <img src={blastoise} width='400' height='800' alt='aa'/>
                </div>
                {!props.loadingPokeball?
                <div className = 'containerGrid'>

                    {props.actualItems && props.actualItems.length && props.actualCategory === 'general'?
                        <div className='filterHome'>
                            <div className = 'itemFilter'>Filter by:</div>
                            <div className = 'itemFilter'>
                                <button  onClick={props.orderByName}>
                                    Name
                                </button>
                            </div>
                            <div className = 'itemFilter'>
                                <button onClick={()=>{props.orderByAttack(props.pokemon)}}>
                                    Attack
                                </button>
                            </div>
                        </div>
                        :<div className='emptyContainer'></div>
                    }
                    {props.actualItems && props.actualItems.length && props.actualItems[0].id?
                    <div className='grid' id={props.loading?'cursorGrid':null}>
                        
                            {
                                props.actualItems && props.actualItems.map((value, index) =>( 
                                    <div >
                                   {/*  <NavLink to='/home/detail' id={props.loading?'cursorGrid':null} className='linkDetail' onClick={()=>{props.getDetail(value.id)}}> */}
                                    {/* <div className='linkDetail'  onClick={()=>{modalOpen(value)}}> */}
                                    <div className='linkDetail'>
                                    <PokemonCard data={value} modal={modalOpen} delete={onDelete}></PokemonCard>
                                    </div>
                                   {/*  </NavLink> */}
                                    </div>
                                ))
                            }      
                    </div>
                   :<div className={'mypokemons'}>You must create a pokemon...</div>
                   }
                    <div>
                    <Modal isOpen={open.open} className='openModalDetail2'>
                        <motion.div 
                            initial='out' 
                            exit='out' 
                            animate='in'
                            variants={pageVariants2}
                            transition={pageTransition2}>
                                <div className='marginLeft'>
                                    <DetailPokemonPop pos={pos} data={open.data} close={modalClose} />
                                </div>
                        </motion.div>
                    </Modal>
                    </div >
                     
                    {props.actualCategory === 'general'?
                    <PageNav></PageNav>
                     :props.actualCategory==='search'?null:<PageNavType></PageNavType>  }
                    
                </div>
                :<div>
                <div className={'loading'}>Loading...</div>
                <div className='imagenGIf'></div>
                </div>
                }
                 
            </div>  

        </div>

    )

}

function mapStateToProps(state) {
    return {
      pokemons: state.pokemon,
      numPages: state.numPages,
      actualItems: state.actualItems,
      pokemon: state.pokemonAttack,
      actualCategory: state.actualCategory,
      loading: state.loading,
      loadingPokeball:state.loadingPokeball
    };
  }
  
  function mapDispatchToProps(dispatch) {
      return {
        getPokemons: pokemon => dispatch(getPokemons(pokemon)),
       orderByName: order => dispatch(orderByName(order)),
       orderByAttack:order => dispatch(orderByAttack(order)),
       getDetail:id => dispatch(getDetail(id)),
      };
    }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(Home);