import axios from "axios";

export function getPokemons(pokemons,page){ //Determina cantidad de botones de paginado
                                            //y carga la página inicial
    
    console.log('se ejecuta get_pkemons')

    /* if(!pokemons.length){  */

      return async (dispatch) => {

          dispatch(loadingPokeball());

          try {
            const { data } = await axios.get(
              /* `http://localhost:3001/pokemons/2000/0` */
              `https://app-fullmovies.herokuapp.com/pokemons/2000/0`
            ); 

            console.log( data)
                    
            dispatch({ type: 'GET_POKEMONS', payload: data });
          } catch (err) {
            dispatch({ type: 'ERROR'});
            console.log(err);
          }

      };

    }


//Muestra la pagina seleccionada y ejecuta el paginado
export function moveGeneralPage(pokemons,page,section){

  var index = (page-1)*12+1;

  console.log('el index es',index)
  console.log('section es ; ',section)

  return async (dispatch) => {

    try {
      const { data } = await axios.get(
        /* `http://localhost:3001/pokemons/12/${index}` */
        `https://app-fullmovies.herokuapp.com/pokemons/12/${index}`
      ); 

      console.log('los resultados son:',data.results)
              
      dispatch({ type: 'MOVE_PAGE', payload: data, section });
    } catch (err) {
        dispatch({ type: 'ERROR'});
        console.log(err);
    }

  };

}

//Muestra la lista ordenada por nombre

export function orderByName () {

    return async (dispatch) => {

        try {
          const { data } = await axios.get(
            /* `http://localhost:3001/pokemons/order/name/2000/0` */
           `https://app-fullmovies.herokuapp.com/pokemons/order/name/2000/0`
          ); 
                  
          dispatch({ type: 'ORDER_NAME', payload: data });
        } catch (err) {
          dispatch({ type: 'ERROR'});
          console.log(err);
        }

  };

}

export function moveOrderedName(pokemons,page,section){

  var index = (page-1)*12+1;

  return async (dispatch) => {

    try {
      const { data } = await axios.get(
       /*  `http://localhost:3001/pokemons/order/name/2000/${index}` */
       `https://app-fullmovies.herokuapp.com/pokemons/order/name/2000/${index}`
      ); 

      console.log('los resultados son',data.results)
              
      dispatch({ type: 'MOVE_PAGE', payload: data, section });
    } catch (err) {
      dispatch({ type: 'ERROR'});
      console.log(err);
    }

  };

}

export function orderByAttack (pokemon) {

  console.log('se ejecuta atackk action');

  return async (dispatch) => {

    try {

      if(!pokemon.length){
          const { data } = await axios.get(
            /* `http://localhost:3001/pokemons/order/attack/0` */
            `https://app-fullmovies.herokuapp.com/pokemons/order/attack/0`
          ); 
          dispatch({ type: 'ORDER_ATTACK', payload: data });
      }else{

          var firstPage = {results:[]};

          pokemon.forEach(value => {
            firstPage.results.push(value)
          });

          console.log('Pagina principal ataque es:',firstPage.results)

          dispatch({ type: 'ORDER_ATTACK', payload: firstPage });
      }
      
    } catch (err) {
      dispatch({ type: 'ERROR'});
      console.log(err);

    } 
  };
}

export function moveAtackOrder(pokemon,page,section){
  
  console.log('se ejecuta moveAtackorder');
  console.log('pagina',page);
  console.log('lista de pokemons',pokemon);

  var index = (page-1)*12+1;

  console.log('el indice es', index)

  return async (dispatch) => {

    try {

      if(index > 48){

        const { data } = await axios.get(
          /* `http://localhost:3001/pokemons/order/attack/${index}` */
          `https://app-fullmovies.herokuapp.com/pokemons/order/attack/${index}`
          
        ); 
        dispatch({ type: 'MOVE_PAGE', payload: data,section }); 
      
      }else{

        var pageRes = {results:[]}

        /* index = index - 1; */

        for(var i = index-1; i<index+12;i++){
          pageRes.results.push(pokemon[i])
          console.log(pokemon[i])

        }

        console.log('se enviara al reducer, ',pageRes)

        dispatch({ type: 'MOVE_PAGE', payload: pageRes, section }); 

        
      }
      
    } catch (err) {
      dispatch({ type: 'ERROR'});
      console.log(err);
    }

  }
  
}

export function getType(type){

  return async (dispatch) => {

    dispatch(loading());
    dispatch(loadingPokeball());

    console.log('se va a ejecutaar', type)

    try {

      const { data } = await axios.get(
        /* `http://localhost:3001/types/${type}/0/100` */
        `https://app-fullmovies.herokuapp.com/types/${type}/0/100`
        
      ); 

      dispatch({ type: 'GET_TYPE', payload: data, category: type, section:1 }); 

      console.log(data)

    }
    catch (err) {
    dispatch({ type: 'ERROR'});
    console.log(err);
    }
    
  }

}

export function movePageType(type,storageTypePage,indexSearch,section,action){

  console.log('se ejecuta MOVE TYPE ACTION',section )

  var flag = false;
  var indexSearchAux = 0;
  var resultSet = {};

  
  console.log('el flag es', flag)

  if(action === 'next'){

    console.log('Entra en Next')

    section = section + 1;

    for(var i = 0; i<storageTypePage.length; i++){
      if(storageTypePage[i].section === section){
        flag = true;
        resultSet.pokemon = storageTypePage[i].items;
        resultSet.indexSearch = storageTypePage[i].indexSearch;
      }
      indexSearch = storageTypePage[i].indexSearch;
    }

    console.log('seccion: ',section)

    if(!flag){

      console.log('entra cuando flag es false')

        return async (dispatch) => {

          dispatch(loading());

          try {

            console.log('ejecuta axios')

            console.log('se ejecutara a partir del index',indexSearch)

            const { data } = await axios.get(
              /* `http://localhost:3001/types/${type}/${indexSearch}/100` */
              `https://app-fullmovies.herokuapp.com/types/${type}/${indexSearch}/100`
             
            ); 

            console.log('la otra pagina es',data)

            dispatch({ type: 'MOVE_TYPE', payload: data, category: type, section }); 

          }
          catch (err) {
          dispatch({ type: 'ERROR'});
          console.log(err);
          }
          
        }
    }else{

      return {
        type: 'MOVE_TYPE',
        payload: resultSet,
        section: section,
        category: null
      }
      

    }

  }else{

    section = section - 1;

    for(var i = 0; i<storageTypePage.length; i++){
      if(storageTypePage[i].section === section){
        flag = true;
        resultSet.pokemon = storageTypePage[i].items;
        resultSet.indexSearch = storageTypePage[i].indexSearch;
      }
      indexSearch = storageTypePage[i]
    }

    return{
      type:'MOVE_TYPE',
      payload: resultSet,
      section: section,
      category: null,

    }

  }

}

export function getDetail(id){

  console.log('se ejecuta DETAIL ACTION');
  console.log('el id del pokemon es',id)

  return async (dispatch) => {

    try {
        const { data } = await axios.get(
         /*  `http://localhost:3001/detail/${id}` */
          `https://app-fullmovies.herokuapp.com/detail/${id}`
        ); 

        dispatch({ type:'DETAIL_POKEMON', payload: data }); 
          
    } catch (err) {
      dispatch({ type: 'ERROR'});
      console.log(err);

    }

  }

}

export function pokemonSearch(name){

  console.log('se va a buscar', name.Title)

  return async (dispatch) => {

    try {
        const { data } = await axios.get(
          /* `http://localhost:3001/search/${name.Title}` */
          `https://app-fullmovies.herokuapp.com/search/${name.Title}`
          
        ); 

        dispatch({ type:'POKEMON_SEARCH', payload: data }); 
          
    } catch (err) {
      dispatch({ type: 'ERROR'});
      console.log(err);
    }

  }

}

export function createPokemon(input){

  console.log('se ejecuta action Create con: ', input)

  return async (dispatch) => {

    try {
          axios({
          method: 'post',
          /* url: 'http://localhost:3001/create', */
          url:'https://app-fullmovies.herokuapp.com/create',
          data: input
        })
        .then(response=>{
          console.log('Status creacion: ', response)
          dispatch({ type:'CREATE_POKEMON', payload:response.data  }); 
        })
        .catch(err=>{
          console.log('error')
          dispatch({ type:'CREATE_POKEMON', payload:'failed' });
        })
    } catch (err) {
      console.log(err);
      dispatch({ type:'CREATE_POKEMON', payload:'failed' });
    }

  }

}

export function getAllTypes(){

  console.log('se ejecuta get all types Action')

  return async (dispatch) => {

    try {
        const { data } = await axios.get(
          /* `http://localhost:3001/alltype/type` */
         `https://app-fullmovies.herokuapp.com/alltype/type`
          
        ); 

        console.log('se obtuvieron los tipos:',data )

        dispatch({ type:'GET_ALL_TYPES', payload: data }); 
          
    } catch (err) {
      dispatch({ type: 'ERROR'});
      console.log(err);

    }

  }

}

export function getMyPokemons(){

  console.log('se ejecuta Mypokemons Action')

  return async (dispatch) => {

    try {
        const { data } = await axios.get(
          /* `http://localhost:3001/mypokemons` */
          'https://app-fullmovies.herokuapp.com/mypokemons'
        ); 

        console.log('Mis pokemons son',data)

        dispatch({ type:'GET_MY_POKEMON', payload: data }); 
          
    } catch (err) {
      dispatch({ type: 'ERROR'});
      console.log(err);

    }

  }

}

export function loading(){
  return {type:'IS_LOADING'}
}

export function loadingPokeball(){
  return {type:'LOADING_POKEBALL'}
}

//Url IMAGES Firebase
export function setUrlImages(payload){
  console.log('payload es: ', payload)
  return {type:'SET_URL_IMAGES', payload}
}




