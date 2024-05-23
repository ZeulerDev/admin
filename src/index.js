import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import AppContext from './context/AppContext'
import 'core-js'

import App from './App'
import store from './store'
import CustomAlert from './components/CustomAlert'

createRoot(document.getElementById('root')).render(
  
    <AppContext>
      <Provider store={store}>
        <App />
        <CustomAlert/>
        
      </Provider>
    </AppContext>
)
