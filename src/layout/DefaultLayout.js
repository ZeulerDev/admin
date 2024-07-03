import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SET_CONTEXT_USER, SET_TOKEN } from '../context/context_reducer'

const DefaultLayout = () => {
  const [{ user }, dispatch] = useAppContext()
  const navigate = useNavigate()
  const userDataString = localStorage.getItem('userData')
  

  useEffect(() => {
    if (userDataString && !user) {
      // localStorage.removeItem('userData');
      console.log("called")
      const initialValue = JSON.parse(userDataString)
      // console.log(initialValue)
      const BrowserToken = initialValue.code
      axios.post('http://localhost:8003/assistant/browsed/login', initialValue).then((res) => {
        if (res.status === 200) {
          
          dispatch({
            type: SET_CONTEXT_USER,
            payload: res.data,
          })

          dispatch({
            type: SET_TOKEN,
            payload:BrowserToken
          })

          navigate('/dashboard')
        } else if (res.status === 204) {
          alert(res.data.message)
        } else if (res.status === 401) {
          alert(res.data.message)
        } else if (res.status === 500) {
          alert(res.data.message)
        }
      })
    } else if (!user) {
      navigate('/login')
    }
  }, [user])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
