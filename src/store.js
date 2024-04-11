import { legacy_createStore as createStore } from 'redux'
import { combineReducers } from 'redux'
import userReducer from './store/reducers/userReducer'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  changeState: changeState, // Managing sidebar and theme
  user: userReducer, // Managing user data
})

const store = createStore(rootReducer)
export default store
