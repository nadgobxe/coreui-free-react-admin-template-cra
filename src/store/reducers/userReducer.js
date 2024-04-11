const userInitialState = {
  user: null,
  token: null,
}

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      // Log the user payload right before updating the state
      console.log(`action.payload.user = ${JSON.stringify(action.payload.user)}`)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    default:
      return state
  }
}

export default userReducer
