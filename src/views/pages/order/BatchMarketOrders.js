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

const BatchMarketOrders = () => {
  const [visible, setVisible] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [batchMarketOrdersData, setBatchMarketOrdersData] = useState([])
  const [batchItems, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [orderCustomerDetails, setOrderCustomerDetails] = useState([])
  const [orderDataDetails, setOrderDataDetails] = useState([])
  const { id, market } = useParams()

  useEffect(() => {
    if (user && token) {
      loadData(id, market)
    }
  }, [user, token])

  const loadData = (id, market) => {
    setLoading(true)
    axios
      .get('http://15.160.211.157/assistant/batch/market/orders/' + id + '/' + market, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
             
            setItems(res.data.orders.flatMap(order => order.items))
      
          setBatchMarketOrdersData(res.data.orders)
          setLoading(false)
        } else if (res.status === 203) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batch markets loading error',
              message: res.data.message,
            },
          })
        } else if (res.status === 204) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batch markets loading error',
              message: res.data.message,
            },
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batch markets loading error',
              message: res.data.message,
            },
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleToggle = () => {
    setVisible(!visible)
  }

  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
        <CForm>
          {/* <CButton type="submit" color="success" variant="outline">
            Search
          </CButton> */}
        </CForm>
      </CNavbar>

      {loading ? (
        <CSpinner />
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Delivery Fee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Slot</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Markup</CTableHeaderCell>
              <CTableHeaderCell scope="col">Order Items</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {batchMarketOrdersData.map((order, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{order.order.no}</CTableDataCell>
                <CTableDataCell>
                  <CBadge style={{ width: 80 }} color="info">
                    {order.order.status}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{order.order.address}</CTableDataCell>
                <CTableDataCell>{order.order.deliveryFee}</CTableDataCell>
                <CTableDataCell>{order.order.slot}</CTableDataCell>
                <CTableDataCell>{order.order.date}</CTableDataCell>
                <CTableDataCell>{order.order.total}</CTableDataCell>
                <CTableDataCell>{order.order.markup}</CTableDataCell>
                <CTableDataCell>
                  <Link>
                    <CIcon icon={cilInfo} size="xl" onClick={() => handleToggle()} />
                  </Link>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}

      <CModal visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Customer Information</CModalTitle>
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
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Measure</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Market</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {batchItems.map((product, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      <CCardImage
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                        src={`https://api.zeuler.com/image/` + product.photo}
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.price}</CTableDataCell>
                    <CTableDataCell>{product.qty}</CTableDataCell>
                    <CTableDataCell>{product.measure}</CTableDataCell>
                    <CTableDataCell>
                      {product.chain} - {product.market}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge style={{ width: 80 }} color="info">
                        {product.status}
                      </CBadge>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default BatchMarketOrders
