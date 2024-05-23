import { CButton, CCol, CContainer, CForm, CFormInput, CFormSelect } from '@coreui/react'
import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'
import { cibDotNet } from '@coreui/icons'
import { SET_ALERT } from '../../../context/context_reducer'


const CreateDriver = ()=>{

    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [iban, setIban] = useState()
    const [employeeId, setEmployeeId] = useState()
    const [city, setCity] = useState()
    const [gender, setGender] = useState()
    const [vat, setVat] = useState()
    const [address, setAddress] = useState()

    const [{ user, token }, dispatch] = useAppContext()
    const navigate = useNavigate()

    

    const handleSubmit = () => {

      if(name && surname && password && email && phone && iban && city && vat && employeeId && gender && address){
        const formData = {
          name: name,
          surname: surname,
          password: password,
          email: email,
          contact: phone,
          iban: iban,
          city: city,
          vat:vat,
          employeeId: employeeId,
          gender: gender,
          address : address
        }

        if(user,token){
            if(user && token){
                axios
                  .post('http://localhost:8003/rider/create', formData, {
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
                          title : 'Driver Registration',
                          message : 'Driver Registration Success',
                          color : 'success'
                        }
                      })
                      navigate('/driver/view')
                    } else if (res.status === 203) {
                      dispatch({
                        type : SET_ALERT,
                        payload : {
                          status : true,
                          title : 'Driver Registration error',
                          message : res.data.message,
                          color:'warning'
                        }
                      })
                    } else if (res.status === 204) {
                      dispatch({
                        type : SET_ALERT,
                        payload : {
                          status : true,
                          title : 'Driver Registration error',
                          message : res.data.message,
                          color:'warning'
                        }
                      })
                    } else if (res.status === 500) {
                      dispatch({
                        type : SET_ALERT,
                        payload : {
                          status : true,
                          title : 'Driver Registration error',
                          message : res.data.message,
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
            message : 'Driver Registration error, Please Check the input fields',
            color:'warning'
          }
        })

      }
        
        
    }

    return(
        <CContainer>
        <div className="row g-3"  >
          <CCol md={6}>
            <CFormInput
              id="name"
              label="Firt Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="surname"
              label="LastName"
              defaultValue={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="address"
              label="Address"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="password"
              label="Password"
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="email"
              label="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="phone"
              label="Contact Number"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="iban"
              label="IBAN"
              defaultValue={iban}
              onChange={(e) => setIban(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="employeeid"
              label="Employee Id"
              defaultValue={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="vat"
              label="Vat"
              defaultValue={vat}
              onChange={(e) => setVat(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
          <CFormSelect
            id="inputState"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option>Select City</option>
            <option >Milano</option>
            <option>Napoli</option>
          </CFormSelect>
        </CCol>
        <CCol md={6}>
          <CFormSelect
            id="gender"
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Select Gender</option>
            <option >Male</option>
            <option>Female</option>
          </CFormSelect>
        </CCol>
  
        <CCol xs={12}>
            <CButton color="warning" type="submit" style={{ marginBottom:'3%', width:'200px' }} onClick={()=>handleSubmit()}>
              Add Driver
            </CButton>
          </CCol>
        </div>
      </CContainer>
 
    )
}

export default CreateDriver