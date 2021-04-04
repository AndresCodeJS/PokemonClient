const initialState = {
    pokemon : [],
    pokemonAttack: [],
    detailPokemon: {},
    numPages : 0, //Se calcula al cambiar de categoria
    actualItems:[], //Siempre se actualiza
    actualCategory:'general' ,//Se reinicia al pulsar home
    section:1, //se reinicia al pulsar home
    orderByName:false,
    orderByAttack:false,
    indexSearch:0,
    /* indexLoaded:0, */
    storageTypePage : [],
    types: [],
    createStatus:'',
    loading:false,
    loadingPokeball:false,
    urlImages : []

  };

export default function rootReducer(state = initialState, action) {

  console.log('state tiene:',state)
  
  switch(action.type){

    case 'GET_POKEMONS':

      var numPages=0;
      var max = 12;
      var actualItems = [];

      //Determinar el numero de paginas para paginado
      if(!(state.pokemon.length)){
        numPages = Math.ceil(action.payload.results.length/12);
      }else{
        numPages = Math.ceil(state.pokemon.length/12);
      }

      if(action.payload.results.length < 12){
        max = action.payload.results.length;
      }

      for(var i = 0; i< max ; i++){
        actualItems.push(action.payload.results[i]);
      }

     /*  console.log(action.payload.results) */

      return {
        ...state,
         pokemon: action.payload.results,
         numPages : numPages,
         actualItems: actualItems,
         actualCategory: 'general',
         section: 1,
         orderByName: false,
         orderByAttack: false,
         detailPokemon: {},
         indexLoaded: 0,
         storageTypePage: [],
         loading:false,
         loadingPokeball:false
      }

    case 'MOVE_PAGE':

      var section = state.section;
      var actualItems = [];
      var max=12;

      if(action.section === 'next'){
        section = state.section + 1 ;
      }else if(action.section === 'prev'){
        section = state.section - 1 ;
      }

      if(action.payload.results.length < 12){
        max = action.payload.results.length;
      }

      for(var i = 0; i< max ; i++){
        actualItems.push(action.payload.results[i]);
      }

      return{
        ...state,
        /* actualCategory : 'fire', */
        actualItems: actualItems,
        section : section,
        loading : false,
      }

    case 'ORDER_NAME':

      var actualItems = [];
      var max = 12;

      if(action.payload.results.length < 12){
        max = action.payload.results.length;
      }

      for(var i = 0; i< max ; i++){
        actualItems.push(action.payload.results[i]);
      }

      return {
        ...state,
        /* pokemon: action.payload.results, */
        actualItems: actualItems,
        orderByName: true,
        orderByAttack: false,
        /* actualCategory: 'general', */
        section: 1,
        loading: false
      }

    case 'ORDER_ATTACK':
 
      /* console.log('los resultados son:',action.payload.results) */

      var actualItems = [];
      var max = 12;

      if(action.payload.results.length < 12){
        max = action.payload.results.length;
      }

      for(var i = 0; i< max ; i++){
        actualItems.push(action.payload.results[i]);
      }

      return{
        ...state,
        actualItems : actualItems,
        pokemonAttack : action.payload.results,
        section : 1,
        orderByName: false,
        orderByAttack:true,
        loading:false
    
      }

  case 'DETAIL_POKEMON':

    console.log('se ejecuta DETAIL reducer');

    console.log(action.payload)

    return {
      ...state,
      detailPokemon: action.payload,
      loading:false,
     /*  section: 1, */
  /*     orderByName: false,
      orderByAttack:false, */

    }

  case 'GET_TYPE':

    console.log('se ejecuta TYPES REDUCER')

    //almacena la data consultada
    var obj = {section : action.section,
               items : action.payload.pokemon,
               indexSearch:action.payload.indexSearch}

    console.log('Se va agregar al storage ',obj)

    var storage = [];
    storage.push(obj)

    return{
      ...state,
      actualCategory:action.category,
      actualItems: action.payload.pokemon,
      indexSearch:action.payload.indexSearch,
      /* indexLoaded:160, */
      orderByName: false,
      orderByAttack: false,
      section:1,
      detailPokemon: {},
      storageTypePage : storage,
      loading:false,
      loadingPokeball:false,
    }

  case 'MOVE_TYPE':

    console.log('se ejecuta MOVE TYPE reducer')

    var storage = [];

    if(action.category){

     //almacena la data consultada
     var obj = {section : action.section,
     items : action.payload.pokemon,
     indexSearch:action.payload.indexSearch}

     console.log('el storage tiene',state.storageTypePage)

      storage = state.storageTypePage;
      storage.push(obj )

     }else{
      storage = state.storageTypePage 
     }

     console.log('en items actuales hay',action.payload.pokemon)


    return{
      ...state,
      section : action.section,
      storageTypePage : storage,
      actualItems: action.payload.pokemon,
      indexSearch:action.payload.indexSearch,
      loading:false
    }

  case 'POKEMON_SEARCH':

  console.log('se ejecuta pokemon search reducer')

  var Item = [];

  if(Array.isArray(action.payload)){
    Item = action.payload;
  }else{
    Item.push(action.payload);
  }

  return{
    ...state,
    actualItems: Item,
    section:1,
    actualCategory:'search',
    loading:false

  }

  case 'CREATE_POKEMON':

      console.log('se ejecuta create pokemon Reducer')

      return{
        ...state,
        createStatus:action.payload,
        section:1,
        loading:false
      }

  case 'GET_ALL_TYPES':

    console.log('se ejecuta get all types Reducer')

      return{
        ...state,
        types:action.payload,
        createStatus:'general',
        loading:false
      }

  case 'GET_MY_POKEMON':

    console.log('se ejecuta Mypokemons Reducer')
    console.log(action.payload)

      return{
        ...state,
        actualItems: action.payload,
        section:1,
        actualCategory:'search',
        loading:false
      }

  case 'IS_LOADING':
    
      return{
        ...state,
        loading:true,
      }

  case 'LOADING_POKEBALL':

    return{
      ...state,
      loadingPokeball:true
    }

  case 'SET_URL_IMAGES':

    console.log('payload reducer es: ', action.payload)

    return{
      ...state,
      urlImages: action.payload
    }



  }//Cierre del switch

    return state;

}