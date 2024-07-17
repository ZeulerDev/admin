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

  const [{ token }, dispatch] = useAppContext()
  const [OrderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)
  const [ProductData, setProductData] = useState([])
  const [productId, setProductIDData] = useState([])
  const [loadingModal, setLoadingModal] = useState(false)
  const [visible, setVisible] = useState(false)

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

      { loading ? <CSpinner/> : <CTable>
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
          {OrderData.map((item,index) => (
            <CTableRow key={index}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell scope="row">{item.name}</CTableDataCell>
              <CTableDataCell>{item.total}</CTableDataCell>
              <CTableDataCell>{item.date}</CTableDataCell>
              <CTableDataCell>{item.saving}</CTableDataCell>
              <CTableDataCell>{item.address.address}</CTableDataCell>
              <CTableDataCell>
                {/* <Link to={`/customers/list/products/${item.id}`}> */}
                  <CButton onClick={() => handleToggle(item.id)} size='sm' style={{ backgroundColor:'#ff4d4d',color:'white'}}>
                    View
                  </CButton>
                {/* </Link> */}
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
            <CSpinner />
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
              {ProductData.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell scope="row"><CCardImage style={{ width :'50px', height:'50px' }} src={`https://api.zeuler.com/image/`+item.photo} /></CTableDataCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.price}</CTableDataCell>
                  <CTableDataCell>{item.subTotal}</CTableDataCell>
                  <CTableDataCell>{item.measurement}</CTableDataCell>
                  <CTableDataCell>{item.saving}</CTableDataCell>
                  <CTableDataCell>{item.quantity}</CTableDataCell>
                  <CTableDataCell>{item.chain}</CTableDataCell>
                  <CTableDataCell>{item.market}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          )}
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton> */}
        </CModalFooter>
      </CModal>




    </CContainer>
  )
}

export default Orders
