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
    CPaginationItem,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdown,
    CSpinner,
  } from '@coreui/react'
  import { Link,useParams } from 'react-router-dom'
  import { useAppContext } from '../../../../context/AppContext'
  import axios from 'axios'

const MarketDistance = ()=>{

  const { id } = useParams()
  const [{ user, token }, dispatch] = useAppContext()
  const [marketLocation, setMarketLocation] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(id){
      if (user && token) {
        setLoading(true)
        axios
          .get(`https://15.160.211.157/market/group/distance/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setMarketLocation(res.data)
              setLoading(false)
            } else if (res.status === 500) {
              dispatch({
                type : SET_ALERT,
                payload : {
                  status : true,
                  title : 'Market group distance loading error',
                  message : res.data.message
                }
              })
            }
          }).catch((err) => {
            console.error('Error:', err)
          })
      }

    }else{
      alert('Market not found')
    }
  },[user])
 

  
    return(
        <CContainer>
        <CNavbar className="bg-body-tertiary">
       
        </CNavbar>
  
        {loading ? <CSpinner/> : <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Routers</CTableHeaderCell>
              <CTableHeaderCell scope="col">Distance</CTableHeaderCell>
              <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
              
            </CTableRow>
          </CTableHead>
          <CTableBody>
          {marketLocation.map((item, index) => (
            
              <CTableRow key={index}>
                <CTableDataCell>{index+1}</CTableDataCell>
                
                <CTableDataCell>
                {item.routeFlow.map((flow, flowIndex) => (
                  <div key={flowIndex}>{flow}</div>
               ))}

                </CTableDataCell>
                <CTableDataCell>{item.distance} km</CTableDataCell>
                <CTableDataCell>{item.duration} min</CTableDataCell>
              </CTableRow>
          ))}
          </CTableBody>
        </CTable>

        }
  
        <CPagination aria-label="Page navigation example">
          <CPaginationItem>Previous</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination>
      </CContainer>
    )
}

export default MarketDistance