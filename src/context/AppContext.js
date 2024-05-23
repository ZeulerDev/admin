import React, { createContext, useContext, useReducer } from 'react'
import reducer,{initialState} from './context_reducer'

const Context = createContext()
export default function AppContext({children}) {
  
    return (
        <Context.Provider value={useReducer(reducer, initialState)}>
            {children}
        </Context.Provider>
    )
}
export const useAppContext = () => useContext(Context)

