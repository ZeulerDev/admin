import { CButton, CCol, CContainer, CForm, CFormInput, CFormSelect } from '@coreui/react'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'
import { cibDotNet } from '@coreui/icons'
import { SET_ALERT } from '../../../context/context_reducer'
import { makeid } from '../../../context/helpers'
import { BASE_URL } from '../../../context/config'
import Promotion from './Promotion';


const CreatePicker = ()=>{

    const [name, setName] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [code, setCode] = useState()

    const [{ user, token }, dispatch] = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
      const codePromotion = makeid(8)
      setCode(codePromotion)
    },[])
   
    

    const handleSubmit = () => {

      if(name && startDate && endDate && code){
        const formData = {
          name: name,
          startDate: startDate,
          endDate : endDate,
          promo_id: code,
        }

        if(user,token){
            if(user && token){
                axios
                  .post(BASE_URL+'promotion/registration', formData, {
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
                          title : 'Promotion Registration',
                          message : 'Promotion Registration Success',
                          color : 'success'
                        }
                      })
                      navigate('/promotions/all')
                    } else if (res.status === 400) {
                      dispatch({
                        type : SET_ALERT,
                        payload : {
                          status : true,
                          title : 'Promotion Registration error',
                          message : "Promotion Registration error",
                          color:'warning'
                        }
                      })
                    } else if (res.status === 500) {
                      dispatch({
                        type : SET_ALERT,
                        payload : {
                          status : true,
                          title : 'Promotion Registration error',
                          message : 'Promotion Registration error 500',
                          color:'warning'
                        }
                      })
                    }
                  })
                  .catch((error) => {
                    console.error('Error:', error)
                  })
          
              }
        }
      }else{

        dispatch({
          type : SET_ALERT,
          payload : {
            status : true,
            title : 'Error!',
            message : 'Promotion Registration error, Please Check the input fields',
            color:'warning'
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
              label="Promotion Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="startDate"
              type='date'
              label="Start Date"
              defaultValue={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="endDate"
              type='date'
              label="End Date"
              defaultValue={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </CCol>
         
          <CCol md={6}>
            <CFormInput
              id="Promotion ID"
              label="promotionid"
              defaultValue={code}
              readOnly
              onChange={(e) => setCode(e.target.value)}
            />
          </CCol>
  
        <CCol xs={12}>
            <CButton  style={{ marginBottom:'3%', width:'200px',backgroundColor:'#ff4d4d',color:'white' }} onClick={()=>handleSubmit()}>
              Add Promotion
            </CButton>
          </CCol>
        </div>
      </CContainer>
 
    )
}

export default CreatePicker