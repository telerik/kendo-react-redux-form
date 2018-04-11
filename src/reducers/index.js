import { combineReducers, createStore, applyMiddleware } from 'redux';
import productsReducer from './productsReducer';
import selectionReducer from './selectionReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'

const productsForm = combineReducers({ productsReducer, selectionReducer, form });
export const store = createStore(productsForm, composeWithDevTools(applyMiddleware(thunk)))
