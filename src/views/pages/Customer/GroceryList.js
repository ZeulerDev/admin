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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCardImage,
} from '@coreui/react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { BASE_URL } from '../../../context/config'
import { SET_ALERT } from '../../../context/context_reducer'

const Orders = () => {
  const { id } = useParams()

  const [{ token, user }, dispatch] = useAppContext()
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)
  const [ProductData, setProductData] = useState([])
  const [productId, setProductIDData] = useState([])
  const [loadingModal, setLoadingModal] = useState(false)
  const [visible, setVisible] = useState(false)

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

    if(user && token){
      loadGroceryData(id, timer)
    }

    return () => {
      clearTimeout(timer);
    };
  }, [])

  const loadGroceryData =(id,timer)=>{
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
            clearTimeout(timer);
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
  }

  const loadProducts = (id) => {
    if (token) {
      setLoadingModal(true)
      axios
        .get(BASE_URL+'assistant/products/list/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setProductData(res.data.products)
            setLoadingModal(false)
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Order product loading error error',
                message : res.data.message
              }
            })
          }
        }).catch((error) => {
          console.error('Error:', error)
        })
    }
  }

  const handleToggle = (id) => {
    setVisible(!visible)
    loadProducts(id)
  }

  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
      </CNavbar>

      {loading ? <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>: (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Saving</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Products</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {orderData.length !== 0 ? (
              orderData.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell scope="row">{item.name}</CTableDataCell>
                  <CTableDataCell>{item.total}</CTableDataCell>
                  <CTableDataCell>{item.date}</CTableDataCell>
                  <CTableDataCell>{item.saving}</CTableDataCell>
                  <CTableDataCell>{item.address.address}</CTableDataCell>
                  <CTableDataCell>
                    <CButton onClick={() => handleToggle(item.id)} size='sm' style={{ backgroundColor: '#ff4d4d', color: 'white' }}>
                      View
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="7" style={{ textAlign: 'center' }}>
                  <h6 style={{ marginTop: "1%" }}>No data</h6>
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      )}

      <CModal visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Customer Order List Information</CModalTitle>
        </CModalHeader>
        <CModalBody
          style={{
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {loadingModal ? (
            <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>
          ) : (
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">SubTotal</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Saving</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Market</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ProductData.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="10" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  ProductData.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell scope="row"><CCardImage style={{ width: '50px', height: '50px' }} src={`https://api.zeuler.com/image/` + item.photo} /></CTableDataCell>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>{item.price}</CTableDataCell>
                      <CTableDataCell>{item.subTotal}</CTableDataCell>
                      <CTableDataCell>{item.measurement}</CTableDataCell>
                      <CTableDataCell>{item.saving}</CTableDataCell>
                      <CTableDataCell>{item.quantity}</CTableDataCell>
                      <CTableDataCell>{item.chain}</CTableDataCell>
                      <CTableDataCell>{item.market}</CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          )}
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default Orders
