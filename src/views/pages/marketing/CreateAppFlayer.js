import { CButton, CCol, CContainer, CForm, CFormInput, CFormSelect } from '@coreui/react'
import React, { useState } from 'react'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { Router, useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import { BASE_URL } from '../../../context/config'



const CreateAppFlayer = ()=>{

    const [appFlayerName, setAppFlayerName] = useState()
    const [url, setUrl] = useState()
    const [{ user, token }, dispatch] = useAppContext()
    const navigate = useNavigate()

    const insertBaseLinkGroup = () => {
        if(appFlayerName && url){
          const formData = {
            name: appFlayerName,
            url: url,
          }

        console.log(formData)
    
        if(user && token){
          axios
            .post(BASE_URL+'app/flayer/link/create', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Link Registration',
                    message : 'Link Registration Success',
                    color : 'success'
                  }
                })
                 navigate('/marketing/app/flayer/all')
              } else if (res.status === 400) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Link Registration error',
                    message : "Please check the input field"
                  }
                })
              } else if (res.status === 500) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Link Registration error',
                    message : res.data.message
                  }
                })
              }
            })
            .catch((error) => {
              console.error('Error:', error)
            })
    
        }
       }else{
        console.log('Please check the input field')
        dispatch({
          type : SET_ALERT,
          payload : {
            status : true,
            title : 'Registration error',
            message : "Please check the input field",
            color : 'warning'
          }
        })
       }
        
      }


    return(
        <CContainer>
        <div className="row g-3" >
          <CCol md={6}>
            <CFormInput
              id="name"
              label="App Flayer Name"
              defaultValue={appFlayerName}
              onChange={(e) => setAppFlayerName(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="url"
              label="Url"
              defaultValue={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </CCol>
         
  
        <CCol xs={12}>
            <CButton color="warning" type="submit" style={{ marginBottom:'3%', width:'17%', backgroundColor:'#ff4d4d', color:'white' }} onClick={()=>insertBaseLinkGroup()}>
              Add Link
            </CButton>
          </CCol>
        </div>
      </CContainer>
    )
}

export default CreateAppFlayer