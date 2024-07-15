import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CNavbar,
  CPagination,
  CPaginationItem,
  CCardImage,
  CSpinner,
  CCol,
  CFormInput
} from '@coreui/react'

import {
  cilInfo,
  cilList,
  cilNotes,
  cilPencil,
} from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'


const Customer = () => {
  const [visible, setVisible] = useState(false)
  const [{user,token}, dispatch] = useAppContext()
  const navigate = useNavigate()
  const [customerData, setCustomerData] = useState([])
  const [customerAddressData, setAddressCustomerData] = useState([])
  const [loading, setLoading] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(0)

  const [visibleCustomer, setVisibleCustomer] = useState(false)
  const [customerEditObj, setCustomerEditObj] =useState([])
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [searchQuery, setSearchQuery] = useState('');
  const [isDisable, setIsDisable] = useState(true)

  useEffect(() => {
    if(user && token){
      loadData(0, true)
    }
  }, [user, token,searchQuery])

  const loadData = (count, moveNext) => {
    setLoading(true)
    axios.get(BASE_URL+'assistant/customers/' + count+'?email='+searchQuery, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.status)
          if (res.status === 200) {
            setCustomerData(res.data)
            setLoading(false)
            console.log(BASE_URL)
            if (res.data.length < 50) {
              setIsDisable(true)
              console.log("ok")
            } else if (res.data.length > 49) {
              setIsDisable(false)
            }
            
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Customers loading error',
                message : res.data.message
              }
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
  }

  const nextPage = () => {
    const c = itemsPerPage + 50
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    const c = itemsPerPage - 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handleToggle = (id) => {
    setVisible(!visible)

    if (token) {
      setLoading(true)
      axios
        .get(BASE_URL+'assistant/addresses/customer/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAddressCustomerData(res.data)
            setLoading(false)
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Customers address error',
                message : res.data.message
              }
            })  
          }
        }).catch((error) => {
          console.error('Customers address:', error)
        })
    }
  }

  const handleToggleCustomer = (customerObj) =>{
    console.log(customerObj)
    setVisibleCustomer(!visibleCustomer)
    setCustomerEditObj(customerObj)
    setName(customerObj.name)
    setSurname(customerObj.surname)
    setEmail(customerObj.email)
    setPhone(customerObj.contact)
  }

  const handleSubmit = () => {
    if(name && surname && email && phone){

      const formData = {
        name: name,
        surname: surname,
        email: email,
        contact: phone
      }

      const id = customerEditObj.id

      if(user,token){
          if(user && token){
              axios
                .patch(BASE_URL+'assistant/customers/update/'+id, formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    setVisibleCustomer(false)
                    const updatedEntity = res.data
                    const list = customerData.map((item) => {
                      if (item.id === updatedEntity.id) {
                        return updatedEntity
                      } else {
                        return item
                      }
                    })
                    setCustomerData([...list])

                  } else if (res.status === 203) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Customer update error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  } else if (res.status === 204) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Customer update error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  } else if (res.status === 500) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Customer update error',
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
          message : 'Customer update error, Please Check the input fields',
          color:'warning'
        }
      })

    }
    
      
  }

  return (
    <CContainer >
      <CNavbar className="bg-body-tertiary">
      <CFormInput  
         type ="text" 
         placeholder="Search by customer email" 
         style={{ width : 450, marginLeft: '2%' }}
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
       
         />
      </CNavbar >

      { loading ? <CSpinner/> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Surname</CTableHeaderCell>
            <CTableHeaderCell scope="col">email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">Language</CTableHeaderCell>
            <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">Grocery</CTableHeaderCell>
            {/* <CTableHeaderCell scope="col">Products</CTableHeaderCell> */}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {customerData.map((item) => (
            <CTableRow key={item.id}>
              <CTableHeaderCell scope="row"><CCardImage style={{ width : 50, height: 50, borderRadius : 10 }} src={`https://api.zeuler.com/image/`+item.photo} /></CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.surname}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>{item.contact}</CTableDataCell>
              <CTableDataCell>{item.country === "it" || item.country === 'Italy' ? 'Italy' : item.country }</CTableDataCell>
              <CTableDataCell>{item.language === 'en' ? 'English' : item.language === 'it' ? 'Italy' : item.language}</CTableDataCell>
              <CTableDataCell>
                <Link>
                <CIcon icon={cilPencil} size='xl'  onClick={() => handleToggleCustomer(item)}/>
                </Link>
              </CTableDataCell>
              <CTableDataCell>
                <Link>
                <CIcon icon={cilInfo} size='xl'  onClick={() => handleToggle(item.id)}/>
                </Link>
               
               
              </CTableDataCell>
              <CTableDataCell>
              <Link to={`/customers/orders/${item.id}`}>
                <CIcon  icon={cilNotes} size='xl' />
                </Link>
              </CTableDataCell>
              {/* <CTableDataCell>
              <Link to={`/customers/items`}>
                 <CIcon icon={cilList} size='xl'/>
                </Link>
              </CTableDataCell> */}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      }

      <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>Previous</CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination>

      <CModal visible={visible} scrollable size='xl' onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Order Grocery List</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ overflowY: 'auto', maxHeight: '70vh', display : "flex", justifyContent : 'center'}}>
          
          {
            loading ? <CSpinner/> : <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Intercom</CTableHeaderCell>
                <CTableHeaderCell scope="col">Flat</CTableHeaderCell>
                <CTableHeaderCell scope="col">Street</CTableHeaderCell>
                <CTableHeaderCell scope="col">House Number</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {customerAddressData.map((items, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row"></CTableHeaderCell>
                  <CTableDataCell>{items.name}</CTableDataCell>
                  <CTableDataCell>{items.intercom}</CTableDataCell>
                  <CTableDataCell>{items.flat}</CTableDataCell>
                  <CTableDataCell>{items.street}</CTableDataCell>
                  <CTableDataCell>{items.houseNumber}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          }

          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>


      <CModal visible={visibleCustomer} scrollable size="lg" onClose={() => setVisibleCustomer(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Customer Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <div className="row g-3">
          <CCol md={6}>
            <CFormInput
              id="name"
              label="Firt Name"
              defaultValue={customerEditObj.name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="surname"
              label="LastName"
              defaultValue={customerEditObj.surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="email"
              label="Email"
              defaultValue={customerEditObj.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="phone"
              label="Contact Number"
              defaultValue={customerEditObj.contact}
              onChange={(e) => setPhone(e.target.value)}
            />
        </CCol>
  
        <CCol xs={12}>
            <CButton color="warning" type="submit" style={{ marginBottom:'3%', width:'200px' }} onClick={()=>handleSubmit()}>
              Update Customer
            </CButton>
          </CCol>
        </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleCustomer(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      
    </CContainer>
  )
}

export default Customer
