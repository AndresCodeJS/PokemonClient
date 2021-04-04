import './App.css';
import NavBar from './components/NavBar/NavBar.js'
import {getPokemons} from './actions/index'
import { connect } from "react-redux";
import Home from './components/Home/Home.js'
import LandingPage from './components/LandingPage/LandingPage'
import PageNav from './components/PageNav/PageNav.js'
import DetailPokemon from './components/DetailPokemon/DetailPokemon.js'
import CreatePokemon from './components/CreatePokemon/CreatePokemon.js'
import CreeateFirebase from './components/CreatePokemons2/CreateFirebase'
import { Route } from "react-router-dom";
import {AnimatePresence, motion} from 'framer-motion';


function App(props) {
  props.getPokemons();
  return (
    <div className="App">
       <AnimatePresence>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={NavBar} />
        <Route exact path="/home" component={Home} />
        <Route path="/home/detail" component={DetailPokemon} />
        <Route path="/home/create" component={CreatePokemon} />
      </AnimatePresence>
     
  
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemons: pokemon => dispatch(getPokemons(pokemon))
  };
}

export default connect(
    null,
    mapDispatchToProps
  )(App);

/* export default App; */
