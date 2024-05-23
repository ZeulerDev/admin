export const SET_CONTEXT_USER = 'SET_CONTEXT_USER'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_ALERT = 'SET_ALERT'

export const initialState = {
  user: undefined,
  token: undefined,
  alert : {
    status : false,
    title : undefined,
    message : undefined,
    color : ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTEXT_USER:
      console.log('token')
      const user = action.payload

      return {
        ...state,
        user: user,
      }

    case SET_TOKEN:
      const token = action.payload

      return {
        ...state,
        token: token,
      }
    case SET_ALERT:
        const alert = action.payload
  
        return {
          ...state,
          alert : alert,
        }
    default:
      return state
  }
}
//user?.name