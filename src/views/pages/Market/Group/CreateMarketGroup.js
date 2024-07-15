import { CButton, CCol, CContainer, CForm, CFormInput, CFormSelect } from '@coreui/react'
import React, { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import axios from 'axios'
import { Router, useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../../context/context_reducer'


const CreateMarketGroup = ()=>{

    const [groupName, setGroupName] = useState()
    const [city, setSelectedCity] = useState()
    const [{ user, token }, dispatch] = useAppContext()
    const navigate = useNavigate()
    console.log('user', user, 'token', token)
    const insertMarketGroup = () => {

        if(groupName && city){
    
          const formData = {
            name: groupName,
            city: city,
          }

        console.log(formData)
    
        if(user && token){
          axios
            .post('http://15.160.211.157/market/groups/create', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 201) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Market Group Registration',
                    message : 'Market Group Registration Success',
                    color : 'success'
                  }
                })
                 navigate('/marketgroups')
              } else if (res.status === 204) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Market Group Registration error',
                    message : res.data.message
                  }
                })
              } else if (res.status === 500) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Market Group Registration error',
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
        dispatch({
          type : SET_ALERT,
          payload : {
            status : true,
            title : 'Please check the input field',
            message : res.data.message
          }
        })
       }
        
      }


    return(
        <CContainer>
        <div className="row g-3" >
          <CCol md={6}>
            <CFormInput
              id="groupName"
              label="Group Name"
              defaultValue={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
          <CFormSelect
            id="inputState"
            label="City"
            value={city}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option>Select City</option>
            <option >Milano</option>
            <option>Napoli</option>
          </CFormSelect>
        </CCol>
  
        <CCol xs={12}>
            <CButton color="warning" type="submit" style={{ marginBottom:'3%', width:'200px' }} onClick={()=>insertMarketGroup()}>
              Add Market Group
            </CButton>
          </CCol>
        </div>
      </CContainer>
    )
}

export default CreateMarketGroup