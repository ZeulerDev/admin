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

const SoloCourierMarkers = () => {

  const [{ user, token }, dispatch] = useAppContext()
  const navigate = useNavigate()
  const [batchMarketsData, setBatchMarketsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingOrders, setLoadingOrders] = useState(false)
  const { id } = useParams()
  const [batchMarketOrdersData, setBatchMarketOrdersData] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState(false)
  const [batchItems, setItems] = useState([])
  const [loadingModal, setLoadingModal] = useState(false)

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
      loadData(id, timer)
    }

    return () => {
      clearTimeout(timer);
    };
  }, [user, token])

  const loadData = (id, timer) => {
    setLoading(true)
    axios
      .get(BASE_URL + 'assistant/solo/courier/markets/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          setBatchMarketsData(res.data)
          setLoading(false)
          clearTimeout(timer);
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

  const handleOrdersModal = (id) => {
    setVisible(true)
    console.log(id)
    loadDataOrders(id)
  }

  const loadDataOrders = (id) => {
    setLoadingOrders(true)
    axios
      .get(BASE_URL+'assistant/solo/couriers/market/orders/670d25c339b74a4f1462d5fd', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setBatchMarketOrdersData(res.data)
          setLoadingOrders(false)
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

  const handleItemsModel = (items) => {
    setVisibleItems(true)
    setItems(items)
  }


  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
        {/* <CForm>
          <CButton type="submit" color="success" variant="outline">
            Search
          </CButton>
        </CForm> */}
      </CNavbar>

      {loading ? (
       <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Chain Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Orders</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {batchMarketsData.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="4" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
            batchMarketsData.markets?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.chain}</CTableDataCell>
                <CTableDataCell>{item.address}</CTableDataCell>
                <CTableDataCell>
                  <Link>
                    <CIcon onClick={()=>{handleOrdersModal(batchMarketsData.id)}} icon={cilList} size="xl" />
                  </Link>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
          </CTableBody>
        </CTable>
      )}


      <CModal visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Market Order List Information</CModalTitle>
        </CModalHeader>
        <CModalBody
          style={{
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {loadingOrders ? (
            <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>
          ) : (
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
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
                {batchMarketOrdersData.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="10" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                batchMarketOrdersData.map((order, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{order.no}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge style={{ width: 80 }} color="info">
                        {order.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{order.address}</CTableDataCell>
                    <CTableDataCell>{(order?.deliveryFee ?? 0).toFixed(2)}</CTableDataCell>
                    <CTableDataCell>{order.slot}</CTableDataCell>
                    <CTableDataCell>{order.date}</CTableDataCell>
                    <CTableDataCell>{(order?.total ?? 0).toFixed(2)}</CTableDataCell>
                    <CTableDataCell>{order.markup}</CTableDataCell>
                    <CTableDataCell>
                      <Link>
                        <CIcon icon={cilInfo} size="xl" onClick={() => {handleItemsModel(order.items)}} />
                      </Link>
                    </CTableDataCell>
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

      <CModal visible={visibleItems} scrollable size="xl" onClose={() => {
        setItems([])
        setVisibleItems(false)}}>
        <CModalHeader closeButton>
          <CModalTitle>Order Products List Information</CModalTitle>
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
                  <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Measure</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Market</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {batchItems.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="8" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                batchItems.map((product, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      <CCardImage
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                        src={`https://api.zeuler.com/image/` + product.photo}
                      />
                    </CTableDataCell>
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

export default SoloCourierMarkers
