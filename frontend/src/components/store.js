import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from "redux-thunk";

import appBarReducer from "./navigation/appBarDuck";
import modulosReducer from "./vista-modulos/modulosDuck";
import userReducer from './gestion-usuarios/userDucks'
import cursosReducer from "./vista-modulos/cursosDuck";
import gruposReducer from "./vista-modulos/gruposDuck";
import requisitosReducer from "./documento-requisitos/requisitosDuck";

const rootReducer = combineReducers({
    appBar : appBarReducer,
    listaModulos : modulosReducer,
    listaCursos : cursosReducer,
    ListaGrupos : gruposReducer,
    listaRequisitos: requisitosReducer,
    users : userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // para la extensión redux_devtools de chrome

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}