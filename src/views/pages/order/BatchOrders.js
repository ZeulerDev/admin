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

const BatchOrders = () => {
  const [visible, setVisible] = useState(false)
  const [visibleCustomer, setVisibleCustomer] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [batchOrdersData, setBatchOrdersData] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [loadingModal, setLoadingModal] = useState(false)
  const [orderCustomerDetails, setOrderCustomerDetails] = useState([])
  const [orderDataDetails, setOrderDataDetails] = useState([])

  useEffect(() => {
    if (user && token) {
      loadData(id)
    }
  }, [user, token])

  const loadData = (id) => {
    setLoading(true)
    axios
      .get('https://15.160.211.157/assistant/batch/orders/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
            console.log('done',res.data)
          setBatchOrdersData(res.data)
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
          }else if (res.status === 204) {
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

  const handleToggle = (id) => {
    setVisible(!visible)
    console.log(id)
    if (token && user) {
      setLoadingModal(true)
      axios
        .get('https://15.160.211.157/assistant/grocery/order/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setOrderDataDetails(res.data)
            setLoadingModal(false)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Order details view error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((error) => {
          console.error('Order details view error:', error)
        })
    }
  }

  const handleCustomerToggle = (id) => {
    setVisibleCustomer(!loadingModal)
    console.log(id)
    if (token && user) {
      setLoadingModal(true)
      axios
        .get('https://15.160.211.157/assistant/grocery/customer/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setOrderCustomerDetails(res.data)
            setLoadingModal(false)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Order details view error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((error) => {
          console.error('Order details view error:', error)
        })
    }
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
              <CTableHeaderCell scope="col">Orders</CTableHeaderCell>
              <CTableHeaderCell scope="col">Info</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {batchOrdersData.orders?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.no}</CTableDataCell>
                <CTableDataCell><CBadge style={{ width:80 }} color="info">{item.status}</CBadge></CTableDataCell>
                <CTableDataCell>{item.address}</CTableDataCell>
                <CTableDataCell>{item.deliveryFee}</CTableDataCell>
                <CTableDataCell>{item.slot}</CTableDataCell>
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>{item.total}</CTableDataCell>
                <CTableDataCell>{item.markup}</CTableDataCell>
                <CTableDataCell>
                  <Link>
                    <CIcon icon={cilInfo} size="xl" onClick={() => handleToggle(item.id)} />
                  </Link>
                </CTableDataCell>
                <CTableDataCell>
                  <Link>
                    <CIcon icon={cilList} size="xl" onClick={() => handleCustomerToggle(item.id)} />
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
                {orderDataDetails.items?.map((items, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      <CCardImage
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                        src={`https://api.zeuler.com/image/` + items.photo}
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{items.name}</CTableDataCell>
                    <CTableDataCell>{items.price}</CTableDataCell>
                    <CTableDataCell>{items.qty}</CTableDataCell>
                    <CTableDataCell>{items.measure}</CTableDataCell>
                    <CTableDataCell>
                      {items.chain} - {items.market}
                    </CTableDataCell>
                    <CTableDataCell><CBadge style={{ width:80 }} color="info">{items.status}</CBadge></CTableDataCell>
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

      <CModal
        visible={visibleCustomer}
        scrollable
        size="lg"
        onClose={() => setVisibleCustomer(false)}
      >
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
            <div>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Name
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderCustomerDetails.name}
                    readOnly
                    plainText
                  />
                </CCol>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Address
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderCustomerDetails.address?.name}
                    readOnly
                    plainText
                  />
                </CCol>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderCustomerDetails.email}
                    readOnly
                    plainText
                  />
                </CCol>
               <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Contact
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderCustomerDetails.contact}
                    readOnly
                    plainText
                  />
                </CCol>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Language
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderCustomerDetails.language === 'en'? 'English' : orderCustomerDetails.language}
                    readOnly
                    plainText
                  />
                </CCol>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Country
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderCustomerDetails.country === 'en'? 'English' : orderCustomerDetails.country}
                    readOnly
                    plainText
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
               <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Latitude
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderCustomerDetails.lat}
                    readOnly
                    plainText
                  />
                </CCol>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Longitude
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderCustomerDetails.lng}
                    readOnly
                    plainText
                  />
                </CCol>
              </CRow>
            </div>
          )}
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

export default BatchOrders
