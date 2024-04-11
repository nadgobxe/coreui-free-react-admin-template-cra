// src/store/actions/userActions.js
export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
})

// This can be dispatched in your login function after successful authentication
