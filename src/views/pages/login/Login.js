import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'


import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_CONTEXT_USER, SET_TOKEN } from '../../../context/context_reducer'
import { makeid } from '../../../context/helpers'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  
  const [ob, dispatch] = useAppContext()

  const onSubmit = () => {
    if (email && password) {
      const bId = makeid(32)
      const data = {
        browserId: bId,
        email: email,
        password: password,
      }


      axios
        .post('http://15.160.211.157/assistant/login', data)
        .then((res) => {
          if (res.status === 200) {
            const browserCookies = {
              browser: bId,
              code: res.data.token,
            }

            localStorage.setItem('userData', JSON.stringify(browserCookies))

            dispatch({
              type: SET_CONTEXT_USER,
              payload: res.data.user,
            })

            dispatch({
              type: SET_TOKEN,
              payload: res.data.token,
            })
            navigate('/')
          } else if (res.status === 203) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Login error',
                message : res.data.message
              }
            })
          } else if (res.status === 204) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Login error',
                message : res.data.message
              }
            })
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Login error',
                message : res.data.message
              }
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } else {
      alert('Both fields are required!')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={onSubmit}>
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
