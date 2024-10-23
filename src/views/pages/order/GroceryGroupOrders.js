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
  CForm,
  CPagination,
  CPaginationItem,
  CCardImage,
  CSpinner,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CBadge,
} from '@coreui/react'

import { cilInfo, cilList, cilNotes } from '@coreui/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const GroceryGroupOrders = () => {
  const [{ user, token }, dispatch] = useAppContext()
  const [groceryGroupOrdersData, setGroceryGroupOrdersData] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Data Loading',
          message: 'Data loading error: Timeout exceeded',
          color: 'warning'
        }
      });
      setLoading(false);
    }, 20000);

    if (user && token) {
      loadData(id,timer)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [user, token])

  const loadData = (id,timer) => {
    setLoading(true)
    axios
      .get(BASE_URL+'assistant/grocery/group/orders/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('data',res.data)
          setGroceryGroupOrdersData(res.data)
          setLoading(false)
          clearTimeout(timer);
        } else if (res.status === 203) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Grocery Groups Orders loading error',
              message: res.data.message,
            },
          })
        } else if (res.status === 204) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Grocery Groups Orders loading error',
              message: res.data.message,
            },
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Grocery Groups Orders loading error',
              message: res.data.message,
            },
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <CContainer>
      <CNavbar style={{ borderBottomColor: 'white' }} className="bg-body-tertiary">
        {/* <a style={{ marginLeft: 5, fontWeight: 'bold' }}>Order Details</a> */}
        <h5 style={{ marginLeft: 5, fontWeight: 'bold' }}>Order Details</h5>
      </CNavbar>

      <div>
        {groceryGroupOrdersData.items?.map((order, orderIndex) => (
          <div key={orderIndex}>
            <div style={{ display: 'flex', marginTop: 10 }}>
              <div>
                <h6 style={{ marginLeft: 5 }}>
                  Order No: <a>{order.order.no}</a>{' '}
                </h6>
                <h6 style={{ marginLeft: 5 }}>
                  Status:{' '}
                  <CBadge style={{ width: 80 }} color="warning">
                    {order.order.status}
                  </CBadge>
                </h6>
                <h6 style={{ marginLeft: 5 }}>Address: {order.order.address}</h6>
              </div>
              <div style={{ marginLeft: 500 }}>
                <h6 style={{ marginLeft: 5 }}>Delivery Fee: {order.order.deliveryFee}</h6>
                <h6 style={{ marginLeft: 5 }}>Markup: {order.order.markup}</h6>
                <h6 style={{ marginLeft: 5 }}>Total: {order.order.total}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <CSpinner />
      ) : (
        <div>
          <CNavbar className="bg-body-tertiary">
            <h5 style={{ marginLeft: 5, fontWeight: 'bold' }}>Order Items</h5>
          </CNavbar>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Measure</CTableHeaderCell>
                <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {groceryGroupOrdersData.items?.map((order, orderIndex) =>
                order.items?.map((item, itemIndex) => (
                  <CTableRow key={`${orderIndex}-${itemIndex}`}>
                    <CTableDataCell>{itemIndex + 1}</CTableDataCell>
                    <CTableDataCell>
                      <CCardImage
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                        src={`https://api.zeuler.com/image/${item.photo}`}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.measure}</CTableDataCell>
                    <CTableDataCell>{item.qty}</CTableDataCell>
                    <CTableDataCell>{item.price}</CTableDataCell>
                  </CTableRow>
                )),
              )}
            </CTableBody>
          </CTable>
        </div>
      )}
    </CContainer>
  )
}

export default GroceryGroupOrders
