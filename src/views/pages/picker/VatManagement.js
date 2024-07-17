import React, { useState,useEffect } from 'react'
import {
    CContainer,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CButton,
    CNavbar,
    CForm,
    CPagination,
    CPaginationItem,CCardImage,
    CFormInput,
    CSpinner,
    CBadge,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
    CModalFooter
  } from '@coreui/react'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import { BASE_URL } from '../../../context/config'




const VatManagement = () => {

    const [visible, setVisible] = useState(false)
    const [{user, token}, dispatch] = useAppContext()
    const [pickersVatData, setPickersVatData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pickerId, setPickerId] = useState('')
    const [vatId, setVatId] = useState('')
    const [searchQuery, setSearchQuery] = useState('');

 

    useEffect(() => {
        if(user && token){
            setLoading(true)
            axios
              .get(BASE_URL+`assistant/vat/shoppers/0?search=`+searchQuery, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  setPickersVatData(res.data)  
                  setLoading(false)
                  console.log('done')

                } else if (res.status === 204) {
                  dispatch({
                    type : SET_ALERT,
                    payload : {
                      status : true,
                      title : 'Error',
                      message : res.data.message,
                      color:'warning'
                    }
                  })
                }else if (res.status === 500) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Error',
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
    },[searchQuery])

    const handleToggle = (id, vatPid = null) => {
        setVisible(!visible)
        setPickerId(id)

        if (vatPid !== null) {
            setVatId(vatPid)
          } else {
            console.log("VAT PID not provided");
          }

        
        console.log(id)

      }

      const handleUpdate = ()=>{
        const data = {
            vat: vatId
          }
      
          if(user && token){
             axios
              .patch(BASE_URL+'assistant/shopper/vat/'+pickerId, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  console.log("updated")
                  setVisible(false)
                  const updatedEntity = res.data
                  const found = pickersVatData.find((f) => f.id === updatedEntity.id)
                  if(found){
                    found.vat = updatedEntity.vat
                  }

                  setPickersVatData([...pickersVatData])
                  dispatch({
                    type : SET_ALERT,
                    payload : {
                      status : true,
                      title : 'Picker VAT Id ',
                      message : 'VAT Id updated successfully',
                    }
                  })

                  // const list=  pickersVatData.map((item) => {
                  //   if(item.id === updatedEntity.id){
                  //     return updatedEntity
                  //   } else {
                  //     return item
                  //   }
                  // })
                  // setPickersVatData([...list])
                  
                } else if (res.status === 203) {
                    console.log("203")
                  dispatch({
                    type : SET_ALERT,
                    payload : {
                      status : true,
                      title : 'Picker VAT Id update error',
                      message : res.data.message
                    }
                  })
                   
                }else if (res.status === 204) {
                    console.log("204")
                  dispatch({
                    type : SET_ALERT,
                    payload : {
                      status : true,
                      title : 'Picker VAT Id update error',
                      message : res.data.message
                    }
                  })
                   
                }else if (res.status === 500) {
                  dispatch({
                    type : SET_ALERT,
                    payload : {
                      status : true,
                      title : 'Picker VAT Id update error',
                      message : res.data.message
                    }
                  })
                   
                }
              }).catch((error) => {
                console.error( error)
                
              })
          }
      }
    
    return(
        <CContainer>
        <CNavbar className="bg-body-tertiary">
         <CFormInput  
         type ="text" 
         placeholder="Search" 
         style={{ width : 450, marginLeft: '0%' }}
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
       
         />
        </CNavbar>
  
        { loading ? <CSpinner/> : <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">City</CTableHeaderCell>
              <CTableHeaderCell scope="col">Vat</CTableHeaderCell>
              <CTableHeaderCell scope="col">Activate</CTableHeaderCell>
              <CTableHeaderCell scope="col">Disabled</CTableHeaderCell>
              <CTableHeaderCell scope="col">market</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {pickersVatData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.city}</CTableDataCell>
                <CTableDataCell>{item.vat ? item.vat : <CBadge color="warning">Empty</CBadge>}</CTableDataCell>
                <CTableDataCell>{item.activate ? <CBadge color="success">Yes</CBadge> : <CBadge color="warning">No</CBadge>}</CTableDataCell>
                <CTableDataCell>{item.disabled ? <CBadge color="success">No</CBadge> : <CBadge color="warning">Yes</CBadge>}</CTableDataCell>
                <CTableDataCell>{item.market?.chain?.name} - {item.market?.address}</CTableDataCell>
                <CTableDataCell>{item.vat === "" ? <CButton size='sm' style={{ backgroundColor:"#ff4d4d", width: 70,color:'white' }} onClick={() => handleToggle(item.id, item.vat)}>Insert </CButton> : <CButton size='sm' style={{ backgroundColor:"#ff4d4d", width: 70,color:'white' }} onClick={() => handleToggle(item.id, item.vat)}>Edit </CButton>}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        }
  
        {/* <CPagination aria-label="Page navigation example">
          <CPaginationItem>Previous</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination> */}


       
        
        
      <CModal  alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Enter Picker's VAT id here</a><br></br>
        <CFormInput
         type="text" 
         placeholder="Vat id"
         value={vatId}
         onChange={(e) => setVatId(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton> */}
          <CButton style={{backgroundColor:'#ff4d4d', color:'white'}} onClick={() => handleUpdate()}>Save changes</CButton>
        </CModalFooter>
      </CModal>


      </CContainer>
    )
}

export default VatManagement