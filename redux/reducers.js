import { combineReducers } from 'redux'

function countReducer(state = { count: 0 }, action) {
    switch(action.type) {
      case "INCREMENT_COUNT":
        return {
          ...state,
          count: state.count + 1
        }
        default:
          return state
    } 
  }
  
export const rootReducer = combineReducers({
countReducer,
})