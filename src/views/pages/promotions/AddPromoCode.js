import { CBadge, CButton, CCol, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormSelect } from '@coreui/react'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'
import { cibDotNet } from '@coreui/icons'
import { SET_ALERT } from '../../../context/context_reducer'
import { makeid } from '../../../context/helpers'
import { BASE_URL } from '../../../context/config'
import Promotion from './Promotion';


const AddPromoCode = ()=>{

    const [name, setName] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [code, setCode] = useState()
    const [description, setDescription] = useState()
    const [discount, setDiscount] = useState()
    const [maxUsePerUser, setMaxUsePerUser] = useState(1)
    const [discountType, setDiscountType] = useState('percentage')
    const [type, setType] = useState('delivery_fee')
    const [maxUse, setMaxUse] = useState()
    const [minTotal, setMinTotal] = useState()

    const [{ user, token }, dispatch] = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
      const codePromotion = makeid(8)
      setCode(codePromotion)
    },[])
   
    

    const handleSubmit = () => {

      if(name && startDate && endDate && code && description && maxUsePerUser && type && maxUse && minTotal){
        
        if(type === 'sub_total' && (!discount || !discountType)){
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Error!',
              message : 'Promotion Registration error, Please Check the input fields',
              color:'warning'
            }
          })
          return
        }
        
        const formData = {
          name: name,
          start: startDate,
          end : endDate,
          code: code,
          description: description,
          discount: type === 'delivery_fee' ? '' :  discount,
          maxUsePerUser: maxUsePerUser,
          discountType: type === 'delivery_fee' ? 'amount' : discountType,
          type: type,
          maxUse: maxUse,
          minTotal: minTotal
        }

        if(user,token){
            if(user && token){
                axios
                  .post(BASE_URL+'promocode/create', formData, {
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
                      navigate('/promotions/promocodes')
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
              id="Promotion ID"
              label="Promo Code"
              defaultValue={code}
              onChange={(e) => setCode(e.target.value)}
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
            <span  style={{width:'100%'}}>Type</span>
            <CDropdown style={{width:'100%', marginTop:'10px', borderWidth : '1px', borderColor : 'lightgray', borderStyle : 'solid'}} >
                <CDropdownToggle style={{display : 'flex',justifyContent:'space-between', alignItems: 'center',}}>{type === 'delivery_fee' ? 'Delivery fee' : 'Sub Total'}</CDropdownToggle>
                <CDropdownMenu style={{width : '100%'}}>
                  <CDropdownItem  onClick={() => setType('delivery_fee')}>Delivery fee</CDropdownItem>
                  <CDropdownItem  onClick={() => setType('sub_total')}>Sub Total</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
          </CCol>

          

          {type === 'sub_total' && <CCol md={6}>

            <span  style={{width:'100%'}}>Discount Type</span>
            <CDropdown style={{width:'100%', marginTop:'10px', borderWidth : '1px', borderColor : 'lightgray', borderStyle : 'solid'}} >
                <CDropdownToggle style={{display : 'flex',justifyContent:'space-between', alignItems: 'center',}}>{discountType === 'percentage' ? 'Percentage' : 'Amount'}</CDropdownToggle>
                <CDropdownMenu style={{width : '100%'}}>
                  <CDropdownItem  onClick={() => setDiscountType('percentage')}>Percentage</CDropdownItem>
                  <CDropdownItem  onClick={() => setDiscountType('amount')}>Amount</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
          </CCol>}

          {type === 'sub_total' && <CCol md={6}>
            <CFormInput
              id="Discount"
              label="Discount"
              type='number'
              defaultValue={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </CCol>}

          <CCol md={6}>
            <CFormInput
              id="Description"
              label="Description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              id="Max Use Per User"
              label="Max Use Per User"
              type='number'
              defaultValue={maxUsePerUser}
              onChange={(e) => setMaxUsePerUser(e.target.value)}
            />
          </CCol>

          

          

          <CCol md={6}>
            <CFormInput
              id="Max Use"
              label="Max Use"
              type='number'
              defaultValue={maxUse}
              onChange={(e) => setMaxUse(e.target.value)}
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              id="Min Total"
              label="Min Total"
              type='number'
              defaultValue={minTotal}
              onChange={(e) => setMinTotal(e.target.value)}
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

export default AddPromoCode