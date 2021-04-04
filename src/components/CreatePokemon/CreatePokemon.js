import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import firebase from 'firebase';
import {createPokemon,getAllTypes,setUrlImages,getPokemons} from '../../actions/index.js'
import {AnimatePresence, motion} from 'framer-motion';
import Popup from '../popup/popup.js'
import {Modal} from 'reactstrap'
import Home from '../Home/Home'
import squartle from '../../assets/squartle.png'
import './CreatePokemon.css'
const spinner = require('../../assets/simple_pokeball.gif')

const firebaseConfig = {
    apiKey: "AIzaSyDJ5J7_0pkNGDhDo1mIkVB0Gyrzvyk7J5U",
    authDomain: "henry-art.firebaseapp.com",
    projectId: "henry-art",
    storageBucket: "henry-art.appspot.com",
    messagingSenderId: "780293113241",
    appId: "1:780293113241:web:89382d33be6a51b0cebf08",
    measurementId: "G-HWGTY5PZ8T"
  };

  firebase.initializeApp(firebaseConfig)

function Create(props){

    const [open,setOpen] = React.useState(false);

    const [pos,setPos] = React.useState(0)

    const [redirect, setRedirect] = React.useState(false);

    const [errors, setErrors] = React.useState({name:'',
                                                hp:'',
                                                attack:'',
                                                defense:'',
                                                speed:'',
                                                height:'',
                                                weight:'',
                                               });

    const [input, setInput] = React.useState({name:'',
                                              hp:'',
                                              attack:'',
                                              defense:'',
                                              speed:'',
                                              height:'',
                                              weight:'',
                                              types1:'',
                                              types2:'',
                                              types3:'',
                                              urlImage:''});

    function typeList(value,types){
        var array = '';
        types.forEach(values=>{
            if(values.name ==  value){
                array = {id:values.id,
                        name:values.name} 
            }
        })

        return array;
    }

    function validate(name,value){
    
        var error={
                   name:'',
                   hp:0,
                   attack:'',
                   defense:'',
                   speed:'',
                   height:'',
                   weight:'',
                   errorType:''
                  };

        if(!input.name){
            error.name = 'Complete Name'
        }
        setErrors({...errors,name:error.name})
    }

    function onChangeType(e){
        const value = e.target.value;
        const name = e.target.name;
        var listValue = typeList(value,props.types)
        setInput({...input,[name]:listValue})
    }


    function onChange(e){
        const value = e.target.value.toLowerCase();
        const name = e.target.name;
        setInput({...input,[name]:value})
        setErrors({...errors,[name]:''})
    }

    async function handleSubmit(event) {

        var error={
            name:'',
            hp:'',
            attack:'',
            defense:'',
            speed:'',
            height:'',
            weight:'',
            errorType:''
           };

        event.preventDefault();

        if(!input.name){
           error.name = 'Name is required'
        }else if(input.name.length>10){
           error.name = 'Name length must be less than 10'
        }else{
            error.name = '' 
        }
        if(input.hp>120){
           error.hp = 'Hp must be less than 120'
        }else if(!input.hp){
           error.hp = "Hp can't be empty"
        }else if(!(input.hp*1)){
           error.hp = "Hp must be a number"
        }
        if(input.attack>120){
            error.attack = 'Attack must be less than 120'
         }else if(!input.attack){
            error.attack = "Attack can't be empty"
         }else if(!(input.attack*1)){
            error.attack = "Attack must be a number"
         }

         if(input.defense>120){
            error.defense = 'Defense must be less than 120'
         }else if(!input.defense){
            error.defense = "Defense can't be empty"
         }else if(!(input.defense*1)){
            error.defense = "Defense must be a number"
         }
         if(input.speed>120){
            error.speed = 'Speed must be less than 120'
         }else if(!input.speed){
            error.speed = "Speed can't be empty"
         }else if(!(input.speed*1)){
            error.speed = "Speed must be a number"
         }
        if(input.weight>2000){
            error.weight = 'Weight must be less than 2000'
         }else if(!input.weight){
            error.weight = "Weight can't be empty"
         }else if(!(input.weight*1)){
            error.weight = "Weight must be a number"
         }
        if(input.height>120){
            error.height = 'Height must be less than 120'
        }else if(!input.height){
            error.height = "Height can't be empty"
        }else if(!(input.height*1)){
            error.height = "Height must be a number"
         }

        setErrors({...errors,hp:error.hp,
                             name:error.name,
                             speed:error.speed,
                             attack:error.attack,
                             defense:error.defense,
                             height:error.height,
                             weight:error.weight})
        
         if(!error.hp &&
            !error.name &&
            !error.speed &&
            !error.attack &&
            !error.defense &&
            !error.height &&
            !error.weight ){
                props.createPokemon(input)
                setPos(window.scrollY)
                setOpen(true)
            }
           
    }

     const [upload,setUpload] = React.useState({process:0,
                                picture:''});

     const [loading,setLoading] = React.useState(false)

    function handleUpload(event){

        setLoading(true);

        const file = event.target.files[0];
        console.log(event.target.files)

        if(event.target.files.length){
                const storageRef = firebase.storage().ref(`/images/${file.name}`)
                const task = storageRef.put(file)

                task.on('state_changed', snapshot =>{
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                    setUpload({
                        process:percentage
                    })

                },error => {
                        console.log(error.message)
                },()=>{
                        storageRef.getDownloadURL().then(url => {
                            setUpload({...upload,picture:url})
                            setInput({...input,urlImage:url})   
                        });

                } )
        }

    }

    if(redirect){
        return <Redirect to="/home" component={Home}></Redirect>;    
    }

    async function onCloseModal() {
        props.getPokemons()
        setOpen(false)
        setRedirect(true);
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
        <div className='containerCreatePokemon'>
               
                <Modal isOpen={open} className='openModal objectModal'>
                    <motion.div 
                        initial='out' 
                        exit='out' 
                        animate='in'
                        variants={pageVariants}
                        transition={pageTransition}>

                        <Popup image={squartle} 
                               close={onCloseModal}
                               position={pos} 
                               title={'Successful Created!'}>
                        </Popup>
                    </motion.div>
                </Modal>

               <motion.div 
               initial='out' 
               exit='out' 
               animate='in'
               variants={pageVariants}
               transition={pageTransition}>

                <div className='subContainerCreate'>

                    <div className='statsCreate'>

                      <div className='titleCreate'>
                        CREATE POKEMON
                      </div>
                    
                     <form className='containerForm' onSubmit={(e) => handleSubmit(e)}>

                                <div className='containerForm1'>
                                    <div className='containerLabelsCreate'>
                                        <label className='labelForm'>Name</label>
                                        <label className='labelForm'>Hp</label>
                                        <label className='labelForm'>Attack</label>
                                        <label className='labelForm'>Defense</label>
                                        <label className='labelForm'>Speed</label>
                                        <label className='labelForm'>Height</label>
                                        <label className='labelForm'>Weight</label>
                                        {/* <label className='labelForm'>Type</label> */}
                                    </div>
                                    <div className='containerInputsCreate'>
                                        <div>
                                        <input onChange = {onChange} name="name" value={input.name} 
                                        className={errors.name?'error':'inputForm'}/> 
                                        </div>
                                        <input onChange = {onChange} name="hp" value={input.hp}
                                        className={errors.hp?'errorShort':'inputFormShort'}/>
                                        <input onChange = {onChange} name="attack" value={input.attack}
                                        className={errors.attack?'errorShort':'inputFormShort'}/>
                                        <input onChange = {onChange} name="defense" value={input.defense}
                                        className={errors.defense?'errorShort':'inputFormShort'}/>
                                        <input onChange = {onChange} name="speed" value={input.speed}
                                        className={errors.speed?'errorShort':'inputFormShort'}/>  
                                        <input onChange = {onChange} name="height" value={input.height} 
                                        className={errors.height?'errorShort':'inputFormShort'}/>
                                        <input onChange = {onChange} name="weight" value={input.weight}
                                        className={errors.weight?'error':'inputForm'}/>
        
                                       {/*  <select name="types1" onChange = {onChangeType} className='listCreate' >
                                            <option> </option>
                                            {arrayTypes.map(value=>(
                                                <option>{value}</option>
                                            ))}
                                        </select>
                                        <select name="types2" onChange = {onChangeType} className='listCreate' >
                                            <option> </option>
                                            {arrayTypes.map(value=>(
                                                <option>{value}</option>
                                            ))}
                                        </select> */}
                    
                                    </div>
                                    <div className='containerErrors'>
                                        {errors.name?<div className='errorsLabel'>{errors.name}</div>:<div className='errorsEmpty'>correct</div>}
                                        {errors.hp?<div className='errorsLabel'>{errors.hp}</div>:<div className='errorsEmpty'>correct</div>}
                                        {errors.attack?<div className='errorsLabel'>{errors.attack}</div>:<div className='errorsEmpty'>correct</div>}
                                        {errors.defense?<div className='errorsLabel'>{errors.defense}</div>:<div className='errorsEmpty'>correct</div>}
                                        {errors.speed?<div className='errorsLabel'>{errors.speed}</div>:<div className='errorsEmpty'>correct</div>}
                                        {errors.height?<div className='errorsLabel'>{errors.height}</div>:<div className='errorsEmpty'>correct</div>}
                                        {errors.weight?<div className='errorsLabel'>{errors.weight}</div>:<div className='errorsEmpty'>correct</div>}

                                    </div>
                                </div>

                            <div className='containerFirebase'>
                            
                                <label for='files' >
                                    {upload.picture?
                                    <div className='containerArtImage'>
                                        <img width='100' height='100' src={upload.picture} />
                                    </div>
                                    :<div className='containerArtImage'>
                                        {loading?
                                        <div className='loadingGIf'></div>
                                        :'Push to add image' }
                                    </div>}
                                </label>    
                                <div className='inputFile'>
                                    <input  type='file' id='files' onChange={handleUpload} />
                                </div>          
              
                            </div>

                            <button type="submit" className='buttonCreate' >create</button>
                            
                        </form>
                    
                    
                    </div>

                </div>

                </motion.div>

                

          {/*   </AnimatePresence> */}
            
        </div>

    )

};

  function mapStateToProps(state) {
    return {
      types: state.types,
      createStatus:state.createStatus,
      urlImages : state.urlImages//Firebase
    };
  }
  
  function mapDispatchToProps(dispatch) {
      return {
       createPokemon: input => dispatch(createPokemon(input)),
       getPokemons: pokemon => dispatch(getPokemons(pokemon)),
       getAllTypes: (input) => dispatch(getAllTypes(input)),
       setUrlImages: (urlImages) => dispatch(setUrlImages(urlImages)),//Firebase
      };
    }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(Create);

