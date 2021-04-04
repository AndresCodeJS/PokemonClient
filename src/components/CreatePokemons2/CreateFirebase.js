import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import firebase from 'firebase';
import {createPokemon,getAllTypes,setUrlImages} from '../../actions/index.js'

import './CreateFirebase.css'

{/* BEGIN firebase */}
/* import {setUrlImages} from '../../actions/index.js' */

/* const firebaseConfig = {
    apiKey: "AIzaSyDJ5J7_0pkNGDhDo1mIkVB0Gyrzvyk7J5U",
    authDomain: "henry-art.firebaseapp.com",
    projectId: "henry-art",
    storageBucket: "henry-art.appspot.com",
    messagingSenderId: "780293113241",
    appId: "1:780293113241:web:89382d33be6a51b0cebf08",
    measurementId: "G-HWGTY5PZ8T"
  };

  firebase.initializeApp(firebaseConfig) */

  {/* END firebase */}

function CreateFirebase(props){

     React.useEffect(()=>{
         console.log('termino2')
         console.log(props.urlImages)
     })

    function onChange(e){
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('hola')
    }

     {/* BEGIN firebase */}

     const [upload,setUpload] = React.useState({process:0,
                                picture:''});

     const[refresh,setRefresh] = React.useState([])

    function handleUpload(event){

        const file = event.target.files[0];
        console.log(event.target.files)

        if(event.target.files.length){
                const storageRef = firebase.storage().ref(`/images/${file.name}`)
                const task = storageRef.put(file)

                task.on('state_changed', snapshot =>{
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                    console.log(percentage)
                    setUpload({
                        process:percentage
                    })

                },error => {
                        console.log(error.message)
                },()=>{
                        storageRef.getDownloadURL().then(url => {
                           /*  console.log('la url es: ',url)
                            let arrayImages = props.urlImages;
                            arrayImages.push(url)
                            props.setUrlImages(arrayImages)
                            console.log('termino1', props.urlImages)
                            setRefresh([1,2]) */

                            setUpload({picture:url})
                          
                        });

                } )
        }

    }

    function onDelete(event) {

        console.log('imagen tocada:',event.target.value)
        let urlImages = props.urlImages.filter(value=>value!=event.target.value)
        props.setUrlImages(urlImages)
        console.log('restante:',urlImages)
    }

    {/* END firebase */}


    return(
        <div className='containerCreatePokemon'>

                   <div className='titleCreate'>
                       UPLOAD IMAGES
                   </div>
                   
                   <form className='containerForm' onSubmit={(e) => handleSubmit(e)}>

                        {/* BEGIN firebase */}

                            <div className='gridFirebase'>
                               
                                {
                                    props.urlImages && props.urlImages.map(value=>(
                                    
                                    <div className='pictureAdd'>
                                        <div className='containerArtImage'>
                                            <img width='100' height='100' src={value} />
                                        </div>
                                        <button onClick={onDelete} value={value}>x</button>
                                    </div>

                                    ))
                                }

                               <div className='pictureAdd'>
                                    <label for='files' >
                                        <div className='containerArtImage'> 
                                            Push to add
                                        </div>
                                        <div className='progressBar'>
                                            <progress value={upload.process} ></progress>
                                        </div>
                                    </label>
                                 
                                    <input  className='inputFile' type='file' id='files' onChange={handleUpload} />
                                   
                                </div>
                            </div>
                                    

                        {/* END firebase */}

                        <button type="submit" className='buttonCreate' >create</button>
                    
                    </form>
            
        </div>

    )

};

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
      )(CreateFirebase);

