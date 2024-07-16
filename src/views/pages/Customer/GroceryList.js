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
  CNavbar,
  CPagination,
  CPaginationItem,
  CSpinner,
} from '@coreui/react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { BASE_URL } from '../../../context/config'

const Orders = () => {
  const { id } = useParams()

  const [{ token }, dispatch] = useAppContext()
  const [OrderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      setLoading(true)
      axios
        .get(BASE_URL+'assistant/list/customer/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setOrderData(res.data)
            setLoading(false)
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Orders loading error',
                message : res.data.message
              }
            })
          }
        }).catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [])

  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
      </CNavbar>

      { loading ? <CSpinner/> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Saving</CTableHeaderCell>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">Products</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {OrderData.map((item) => (
            <CTableRow key={item.id}>
              <CTableHeaderCell scope="row">{item.name}</CTableHeaderCell>
              <CTableDataCell>{item.total}</CTableDataCell>
              <CTableDataCell>{item.date}</CTableDataCell>
              <CTableDataCell>{item.saving}</CTableDataCell>
              <CTableDataCell>{item.address.address}</CTableDataCell>
              <CTableDataCell>
                <Link to={`/customers/orders/products/${item.id}`}>
                  <CButton size='sm' style={{ backgroundColor:'#ff4d4d',color:'white'}}>
                    View
                  </CButton>
                </Link>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      }

      {/* <CPagination aria-label="Page navigation example">
        <CPaginationItem>Previous</CPaginationItem>
        <CPaginationItem>Next</CPaginationItem>
      </CPagination> */}
    </CContainer>
  )
}

export default Orders