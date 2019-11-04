import { createStore } from 'redux'
import { rootReducer } from '../redux/reducers'

const INITIAL_STATE =  {}

export const store = createStore(rootReducer, INITIAL_STATE)